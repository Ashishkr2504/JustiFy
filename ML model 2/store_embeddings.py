from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
import numpy as np
import json

# MongoDB connection string
mongo_uri = "mongodb+srv://ashishkr01062003:VRGCpYP8csg8whOO@justifycluster.dscbfxc.mongodb.net/?appName=JustiFyCluster"

client = MongoClient(mongo_uri)

# Choose the database and collection
db = client['legal_documents']
collection = db['embeddings']

# Load the Sentence Transformer model
model = SentenceTransformer("BAAI/bge-small-en")

# Function to encode and store embeddings
def encode_and_store(texts, ids, sources):
    # Encode texts into embeddings
    embeddings = model.encode(texts, show_progress_bar=True, convert_to_numpy=True)

    # Normalize embeddings (recommended for cosine similarity)
    embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)

    # Store in MongoDB
    for idx, emb in enumerate(embeddings):
        document = {
            "id": ids[idx],
            "source": sources[idx],
            "text": texts[idx],
            "embedding": emb.tolist()  # Convert numpy array to list for storage
        }
        collection.insert_one(document)

    print("Embeddings stored in MongoDB Atlas.")

# Load your preprocessed data (JSON format)
with open("all_legal_chunks.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Prepare the texts, ids, and sources for embedding
texts = [item["text"] for item in data]
ids = [item["id"] for item in data]
sources = [item["source"] for item in data]

# Call the function to encode and store
encode_and_store(texts, ids, sources)
