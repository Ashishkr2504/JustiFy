import os
import re
import json
import pdfplumber

# 1. Extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

# 2. Clean text
def clean_text(text):
    text = re.sub(r'\n+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)
    return text.strip()

# 3. Chunk text using sliding window
def chunk_text(text, max_tokens=250, stride=100):
    words = text.split()
    chunks = []
    for i in range(0, len(words), stride):
        chunk = words[i:i + max_tokens]
        if len(chunk) >= 50:
            chunks.append(' '.join(chunk))
    return chunks

# 4. Process all PDFs in a folder
def process_folder(folder_path, output_file):
    all_chunks = []
    file_count = 0

    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            print(f"📄 Processing: {filename}")
            raw_text = extract_text_from_pdf(file_path)
            cleaned = clean_text(raw_text)
            chunks = chunk_text(cleaned)

            for i, chunk in enumerate(chunks):
                all_chunks.append({
                    "id": f"{filename}_{i}",
                    "source": filename,
                    "text": chunk
                })
            file_count += 1

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_chunks, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {file_count} files processed.")
    print(f"✅ Total chunks: {len(all_chunks)}")
    print(f"💾 Saved to {output_file}")

# 🚀 Run
if __name__ == "__main__":
    folder_path = "legal_docs"           # 🔁 folder containing PDF files
    output_json = "all_legal_chunks.json"  # 🔁 output file
    process_folder(folder_path, output_json)
