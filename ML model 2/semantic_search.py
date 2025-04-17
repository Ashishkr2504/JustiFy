# import os
# import numpy as np
# from pymongo import MongoClient
# from dotenv import load_dotenv
# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity
# from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline
# import certifi

# # Load environment variables
# load_dotenv()
# mongo_uri = os.environ.get("MONGODB_URI")

# # Load semantic search embedding model (BGE-small)
# embedding_model = SentenceTransformer("BAAI/bge-small-en")

# # Load InLegalBERT for Question Answering
# tokenizer = AutoTokenizer.from_pretrained("law-ai/InLegalBERT")
# qa_model = AutoModelForQuestionAnswering.from_pretrained("law-ai/InLegalBERT")
# qa_pipeline = pipeline("question-answering", model=qa_model, tokenizer=tokenizer)

# # Connect to MongoDB Atlas with TLS
# client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())
# db = client['legal_documents']
# collection = db['embeddings']

# # Apply BGE instruction
# def apply_instruction(text):
#     return "Represent this sentence for searching relevant legal information: " + text

# # Semantic search function
# def semantic_search(query, top_k=5):
#     query_vec = embedding_model.encode([apply_instruction(query)])
#     query_vec = query_vec / np.linalg.norm(query_vec)

#     docs = list(collection.find({}))
#     doc_embeddings = np.array([doc["embedding"] for doc in docs])
    
#     similarities = cosine_similarity(query_vec, doc_embeddings)[0]
#     top_indices = np.argsort(similarities)[::-1][:top_k]
#     return [docs[i] for i in top_indices]

# # Generate legal answer using InLegalBERT
# def generate_legal_answer(query, context_text):
#     result = qa_pipeline({
#         "context": context_text,
#         "question": query
#     })
#     return result["answer"], result.get("score", None)

# # Main program
# if __name__ == "__main__":
#     query = input("🔍 Enter your legal question: ")
#     results = semantic_search(query)

#     print("\n📄 Top Results:")
#     for i, doc in enumerate(results, 1):
#         print(f"\nResult {i}:")
#         print(f"Source: {doc.get('source', 'N/A')}")
#         print(f"Text: {doc['text'][:500]}...")  # Truncated for preview

#     combined_context = " ".join([doc['text'] for doc in results])
#     answer, confidence = generate_legal_answer(query, combined_context)

#     print("\n🧠 Legal Answer:")
#     print(f"{answer}")
#     if confidence:
#         print(f"Confidence Score: {confidence:.2f}")

# .....................................................................

import os
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline
import certifi

# Load environment variables
load_dotenv()
mongo_uri = os.environ.get("MONGODB_URI")

# Load semantic search embedding model
embedding_model = SentenceTransformer("BAAI/bge-small-en")

# Load deepset/bert-base-cased-squad2 for QA
tokenizer = AutoTokenizer.from_pretrained("deepset/bert-base-cased-squad2")
qa_model = AutoModelForQuestionAnswering.from_pretrained("deepset/bert-base-cased-squad2")
qa_pipeline = pipeline("question-answering", model=qa_model, tokenizer=tokenizer)

# Connect to MongoDB Atlas with TLS
client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())
db = client['legal_documents']
collection = db['embeddings']

# Apply BGE instruction for better semantic search
def apply_instruction(text):
    return "Represent this sentence for searching relevant legal information: " + text

# Split long documents into smaller chunks
def split_into_chunks(text, chunk_size=500):
    words = text.split()
    chunks = [' '.join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    return chunks

# Semantic search function to find top legal documents
def semantic_search(query, top_k=2):  # Change top_k to 2 for top 1-2 relevant documents
    query_vec = embedding_model.encode([apply_instruction(query)])
    query_vec = query_vec / np.linalg.norm(query_vec)

    docs = list(collection.find({}))
    doc_embeddings = np.array([doc["embedding"] for doc in docs])

    similarities = cosine_similarity(query_vec, doc_embeddings)[0]
    top_indices = np.argsort(similarities)[::-1][:top_k]
    return [docs[i] for i in top_indices]

# Answer generation using deepset/bert-base-cased-squad2
def generate_legal_answer(query, context_text):
    result = qa_pipeline({
        "context": context_text,
        "question": query
    })
    return result

# Main program
if __name__ == "__main__":
    query = input("🔍 Enter your legal question: ")

    # Rephrase the query to make it more specific
    rephrased_query = f"Please explain the legal process regarding: {query}"

    # Perform semantic search to get top legal documents
    results = semantic_search(rephrased_query)

    print("\n📄 Top Results:")
    for i, doc in enumerate(results, 1):
        print(f"\nResult {i}:")
        print(f"Source: {doc['source']}")
        print(f"Text: {doc['text'][:500]}...")

    # Combine results and split them into chunks
    combined_context = " ".join([doc['text'] for doc in results])
    context_chunks = split_into_chunks(combined_context)

    # Limit to only top 1-2 relevant chunks for processing
    relevant_chunks = context_chunks[:2]  # Take top 2 chunks

    # Get answers for each chunk and choose the best one
    best_answer = None
    best_score = 0.0
    for chunk in relevant_chunks:
        answer_result = generate_legal_answer(rephrased_query, chunk)
        answer = answer_result['answer']
        score = answer_result['score']

        # If the answer's confidence score is higher than the current best, update
        if score > best_score:
            best_score = score
            best_answer = answer

    # If the confidence score is low, suggest rephrasing the question
    if best_score < 0.5:
        print("\n🧠 The system could not find a confident legal answer. Please rephrase your question or contact a legal expert.")
    else:
        print("\n🧠 Legal Answer:")
        print(f"{best_answer}")
        print(f"Confidence Score: {best_score}")
        print("Note: The answer is based on the top relevant legal documents found.")
