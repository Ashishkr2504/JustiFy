# embed_and_index.py

import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Load your preprocessed chunked data
with open("all_legal_chunks.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Load embedding model
model = SentenceTransformer("BAAI/bge-small-en")

# Optionally: add special instruction for BGE models
def apply_instruction(text):
    return "Represent this sentence for searching relevant legal information: " + text

# Prepare texts and IDs (including source info for later retrieval)
texts = [apply_instruction(item["text"]) for item in data]
ids = [item["id"] for item in data]
sources = [item["source"] for item in data]  # We'll store this for retrieval later

# Generate embeddings
embeddings = model.encode(texts, show_progress_bar=True, convert_to_numpy=True)

# Normalize embeddings (recommended for cosine search)
embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)

# Create FAISS index (for cosine similarity)
dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)  # Inner product ≈ cosine if normalized
index.add(embeddings)

# Save index and ID mapping
faiss.write_index(index, "legal_index.faiss")

# Save the id and source mapping for later reference (retrieving full document info)
with open("id_source_map.json", "w", encoding="utf-8") as f:
    json.dump({"id": ids, "source": sources}, f, indent=2)

print("✅ FAISS index created and saved as legal_index.faiss")
print("✅ id_source_map.json saved for later retrieval.")
