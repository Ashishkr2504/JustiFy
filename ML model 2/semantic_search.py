import os
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
import certifi

# Load environment variables
load_dotenv()
mongo_uri = os.environ.get("MONGODB_URI")
genai.configure(api_key="AIzaSyDvH_zyaHMtJYU6gf3qBmfkUTE2UdTFdx0")

# Load embedding model for semantic search
embedding_model = SentenceTransformer("BAAI/bge-small-en")

# Connect to MongoDB Atlas
client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())
db = client['legal_documents']
collection = db['embeddings']

# Apply BGE-style instruction to the query
def apply_instruction(text):
    return "Represent this sentence for searching relevant legal information: " + text

# Split long documents into smaller chunks
def split_into_chunks(text, chunk_size=500):
    words = text.split()
    chunks = [' '.join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    return chunks

# Semantic search to get top documents
def semantic_search(query, top_k=3):  # Changed top_k default to 3
    query_vec = embedding_model.encode([apply_instruction(query)])
    query_vec = query_vec / np.linalg.norm(query_vec)

    docs = list(collection.find({}))
    doc_embeddings = np.array([doc["embedding"] for doc in docs])
    similarities = cosine_similarity(query_vec, doc_embeddings)[0]

    top_indices = np.argsort(similarities)[::-1][:top_k]
    top_docs = [docs[i] for i in top_indices]
    return top_docs

# Use Gemini to generate legal answer from top relevant chunks
def generate_legal_answer_with_gemini(query, chunks):
    context = "\n\n".join(chunks)
    prompt = f"""You are a legal assistant exclusively for Indian laws. Based on the following legal context and your own knowledge about Indian laws, answer the user's question accurately and informatively in a clear and understandable manner within one or two paragraphs depnding on the query, if the legal context provide is unrelated then say "Your query is not properly phrased" then answer the query on your own, if the legal context is related but it does not address the query  then answer the query on your own ,always give an answer.

Context:
{context}

User Query:
{query}

Answer:"""

    try:
        model = genai.GenerativeModel("gemini-2.0-flash-lite")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error generating answer from Gemini: {e}"

# Calculate similarity between query and answer for confidence score
def calculate_confidence_score(query, answer):
    query_vec = embedding_model.encode([query])
    answer_vec = embedding_model.encode([answer])
    query_vec = query_vec / np.linalg.norm(query_vec)
    answer_vec = answer_vec / np.linalg.norm(answer_vec)
    similarity = cosine_similarity(query_vec, answer_vec)[0][0]
    return similarity

# Main program
if __name__ == "__main__":
    query = input("🔍 Enter your legal question: ")

    rephrased_query = f"Please explain the legal process regarding: {query}"
    results= semantic_search(rephrased_query)

    print("\n📄 Top Results:")
    for i, doc in enumerate(results, 1):
        print(f"\nResult {i}:")
        print(f"Source: {doc['source']}")
        print(f"Text: {doc['text'][:500]}...")

    combined_context = " ".join([doc['text'] for doc in results])
    context_chunks = split_into_chunks(combined_context)
    relevant_chunks = context_chunks[:3]

    best_answer = generate_legal_answer_with_gemini(rephrased_query, relevant_chunks)

    # Calculate confidence score
    if "Error generating answer" not in best_answer:
        confidence_score = calculate_confidence_score(query, best_answer)
    else:
        confidence_score = 0.0

    # Confidence label
    if confidence_score >= 0.75:
        confidence_label = "High ✅"
    elif confidence_score >= 0.5:
        confidence_label = "Medium ⚠️"
    else:
        confidence_label = "Low ❗"

    if "Error generating answer" in best_answer or len(best_answer.strip()) < 20:
        print("\n🧠 The system could not find a confident legal answer. Please rephrase your question or contact a legal expert.")
    else:
        print("\n🧠 Legal Answer:")
        print(f"{best_answer}")
        print(f"Confidence Score: {confidence_score:.2f} ({confidence_label})")
       
        print("Disclaimer: This is an AI-generated response always consult a legal expert for critical matter.")