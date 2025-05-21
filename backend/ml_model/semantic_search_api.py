from flask import Flask, request, jsonify
from semantic_search import semantic_search  # Import your function
import logging
import os

# If you use MongoDB ObjectId in your results, import ObjectId
try:
    from bson import ObjectId
except ImportError:
    ObjectId = None

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

def convert_objectid(obj):
    if ObjectId and isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    if isinstance(obj, dict):
        return {k: convert_objectid(v) for k, v in obj.items()}
    return obj

@app.route('/search', methods=['POST'])
def search():
    try:
        data = request.json
        query = data.get('query')
        filter = data.get('filter')
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        results = semantic_search(query, top_k=5)  # Optionally use filter
        results = convert_objectid(results)  # Convert ObjectId to string
        return jsonify(results)
    except Exception as e:
        app.logger.error(f"Error in /search: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render sets PORT env var
    app.run(host="0.0.0.0", port=port)