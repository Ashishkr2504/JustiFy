# semantic_search.py

import numpy as np
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load model
model = SentenceTransformer("BAAI/bge-small-en")

# Connect to MongoDB Atlas
mongo_uri = "mongodb+srv://ashishkr01062003:VRGCpYP8csg8whOO@justifycluster.dscbfxc.mongodb.net/?appName=JustiFyCluster"

client = MongoClient(mongo_uri)
db = client['legal_documents']
collection = db['embeddings']

# Apply BGE instruction
def apply_instruction(text):
    return "Represent this sentence for searching relevant legal information: " + text

# Semantic search function
def semantic_search(query, top_k=5):
    # Encode query
    query_instruction = apply_instruction(query)
    query_vec = model.encode([query_instruction])
    query_vec = query_vec / np.linalg.norm(query_vec)

    # Fetch all documents and embeddings from MongoDB
    docs = list(collection.find({}))
    doc_embeddings = np.array([doc["embedding"] for doc in docs])

    # Compute cosine similarity
    similarities = cosine_similarity(query_vec, doc_embeddings)[0]

    # Get top k results
    top_indices = np.argsort(similarities)[::-1][:top_k]
    top_docs = [docs[i] for i in top_indices]

    return top_docs

# Example usage
if __name__ == "__main__":
    query = input("🔍 Enter your legal question: ")
    results = semantic_search(query)

    print("\n📄 Top Results:")
    for i, doc in enumerate(results, 1):
        print(f"\nResult {i}:")
        print(f"Source: {doc['source']}")
        print(f"Text: {doc['text'][:500]}...")  # Print first 500 chars
