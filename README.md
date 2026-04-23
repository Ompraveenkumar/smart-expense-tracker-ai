# 💰 Smart Expense Tracker AI (MERN + Gemini)

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://smart-expense-tracker-ai-frontend.onrender.com)
[![Status](https://img.shields.io/badge/status-active-blue)](https://smart-expense-tracker-ai-frontend.onrender.com)
[![Auth](https://img.shields.io/badge/auth-JWT-orange)](https://smart-expense-tracker-ai-frontend.onrender.com)

A sophisticated financial management ecosystem that transforms static transaction data into actionable insights using Google's **Gemini AI**. This project features a full-scale MERN architecture with secure User Authentication, real-time data visualization, and AI-powered financial coaching.

---

## 🚀 Live Demo
Direct Link: **[View Live Project](https://smart-expense-tracker-ai-frontend.onrender.com)**

---

## 🧠 Smart Features
* **User Authentication:** Secure Sign-up and Login system powered by **JWT (JSON Web Tokens)** and **Bcrypt** password hashing.
* **AI Financial Advisor:** Custom prompt engineering via Google Gemini API to analyze spending patterns and provide tailored saving strategies.
* **Real-time Dashboard:** Live visualization of income vs. expenses with dynamic balance calculations.
* **Full CRUD Workflow:** Clean, responsive interface for managing financial records with automated server-side validation.

## 🏗️ System Architecture
The application follows a decoupled client-server architecture:
- **Client:** React SPA utilizing `Context API` for global state and `Protected Routes` for authenticated users.
- **Server:** Node/Express REST API with JWT middleware and secure error handling.
- **Database:** MongoDB Atlas for cloud-based document storage.

---

## 🛠️ Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Styled Components, Axios, Chart.js, Framer Motion |
| **Backend** | Node.js, Express.js, Mongoose, **JWT, BcryptJS** |
| **Database** | MongoDB Atlas |
| **AI** | Google Generative AI (Gemini Pro) |
| **Deployment** | Render (CI/CD from GitHub) |

---

## 🛡️ Security & Performance
- **Data Privacy:** Passwords are never stored in plain text; JWTs ensure secure access to user-specific data.
- **Environment Safety:** Strict `.gitignore` implementation to prevent API key and database credential leaks.
- **Error Handling:** Robust `try-catch` logic with custom fallback messages for a smooth User Experience (UX).

---

## 🔧 Local Development
1. **Clone & Install:**
   ```bash
   git clone [https://github.com/Ompraveenkumar/smart-expense-tracker-ai.git](https://github.com/Ompraveenkumar/smart-expense-tracker-ai.git)
   cd backend && npm install
   cd ../frontend && npm install

2.Environment Configuration:
Create a .env in the /backend folder:

Code snippet
MONGO_URL=your_mongodb_url
PORT=5000
GEMINI_API_KEY=your_google_ai_key
JWT_SECRET=your_custom_secret_key

3.Execution:

Bash
# From root directory
npm run dev