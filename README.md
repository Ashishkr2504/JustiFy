
# JustiFy - Free Legal Aid Platform 🧑‍⚖️⚖️

### Created by: **Pallavi Kumari & Ashish Kumar**  
![Screenshot (3)](https://github.com/user-attachments/assets/c4b763ef-8cd3-47c4-bb69-489e5ced1136)
                                    Home Page

---

## 📌 Overview

**JustiFy** is an AI-powered legal aid platform designed to provide **free, instant, and accessible legal guidance** to low-income individuals across India. By integrating a custom-trained NLP/ML model with BAAI/bge-small-en and semantic search, it offers user-friendly legal help in both **English and Hindi**, reducing barriers to justice.

---

## 🧠 Key Features

- ✅ **AI Legal Chatbot** – Powered by a custom-trained NLP model using BAAI/bge-small-en.
- 🔍 **Semantic Search** – Finds relevant Indian law documents based on user queries.
- 📝 **Auto-generated Legal Templates** – Generates common legal documents (e.g., affidavits, complaints).
- 📄 **Legal Document Analyzer** – Upload documents for quick legal summaries.
- 📚 **Legal Document Search** – Browse Indian law documents by keywords.
- 📍 **Location-Based Legal Aid** – Find nearby legal aid centers, courts, and helplines using geolocation.
- 🌐 **Multilingual Support** – Toggle between English and Hindi for wider accessibility.
- 📰 **Law + AI Blog** – Stay updated with legal news and AI advancements.
- 🧑‍💼 **User Dashboard** – Role-based interface for users with persistent navigation.

---

## 🏗️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, ShadCN, LeafletJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **AI/NLP**: BAAI/bge-small-en, FAISS, Hugging Face Transformers
- **APIs**: MapMyIndia for geolocation-based legal services
- **Other Tools**: JWT Authentication, EmailJS for contact form, GitHub Actions (CI/CD)

---

## 🚀 How to Run Locally

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/JustiFy.git
   cd JustiFy
   ```

2. Set up environment variables  
   Create a `.env` file in both frontend and backend directories:

   - Backend `.env`:
     ```
     PORT=5000
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_jwt_secret
     MAPMYINDIA_CLIENT_ID=your_client_id
     MAPMYINDIA_CLIENT_SECRET=your_client_secret
     EMAIL_USER=your_email
     EMAIL_PASS=your_password
     ```

3. Install dependencies and start servers  
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Frontend
   cd ../frontend
   npm install
   npm run dev
   ```

---


## 🎯 Future Improvements

- Case tracking with status updates  
- Integration with Indian court APIs (eCourts)  
- More advanced legal document generation  
- Voice assistant in chatbot (for accessibility)

---

## 🤝 Credits

Thanks to **Pallavi Kumari** for collaborating on this meaningful project and contributing immensely to its design and implementation.

---

## 📬 Contact

Have questions or feedback?  
Reach out to us at **ashishkr01062003@gmail.com or kumaripallavi082@gmail.com** or raise an issue in the repo.
