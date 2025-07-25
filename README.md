# 📝 MERN Notes App

A full-stack Notes Application built with the MERN stack (MongoDB, Express, React, Node.js).  
It allows users to register, log in, create, edit, and delete personal notes. Notes are private and securely stored.

## 🚀 Features

- 🧾 Create, edit, delete notes
- 🔒 User authentication with JWT
- 👤 Login / Register with hashed passwords
- 📚 RESTful API built with Express and MongoDB
- 🎨 Clean React frontend with Tailwind CSS (optional)
- 🌐 Deployed with Render

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcrypt

---

## 📦 Installation
```bash
In the root folder
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

💻 Frontend Setup

cd frontend
npm install
npm run dev

💻 Backend Setup

cd backend
npm install
npm run dev


🌍 Deployment

    Frontend & Backend deployed on Render


    📁 Folder Structure

mern-notes-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
└── README.md


✅ API Endpoints
Method	Endpoint	Description
POST	/api/users/login	User login
POST	/api/users	User registration
GET	/api/notes	Get all user notes
POST	/api/notes	Create new note
PUT	/api/notes/:id	Update existing note
DELETE	/api/notes/:id	Delete a note


🔐 Auth

    JWT used for authentication

    Protected routes with middleware

    bcrypt for password hashing


🧪 Future Improvements

    Tagging & categorizing notes

    Dark mode toggle

    Improved UI


🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.
📜 License


📧 Contact

Built Rem Simiyu.
Feel free to reach out via GitHub or LinkedIn!