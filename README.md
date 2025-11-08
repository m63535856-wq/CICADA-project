# 🦊 Mastersolis Infotech – AI-Powered Company Website

A modern, intelligent, fully responsive company website built using **React + Vite + Tailwind**, powered by a **Python Flask backend** and **Supabase database**, enhanced with **AI automation** for content generation, resume analysis, and visitor engagement.

This project serves as a dynamic company website AND an internal AI-powered tool that automates content management, recruitment workflows, and client engagement.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Pages](#core-pages)
- [AI Integration](#ai-integration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🌐 Overview

Mastersolis Infotech's website is designed to:

✅ Showcase company vision, services, projects, culture  
✅ Provide AI-generated content, summaries, and automation  
✅ Serve as a recruitment platform with AI-assisted resume tools  
✅ Include an admin dashboard for content management  
✅ Offer a clean, modern UX with dark/light theme support  

The project includes:

- A **React frontend** with shadcn UI components  
- A **Flask backend API**  
- **Supabase** database for auth, contact messages, and applications  
- AI-powered features using OpenAI / Anthropic (future integration)  

---

## ✨ Features

### ✅ Public Website
- Responsive UI (desktop + mobile)
- Dark/Light theme toggle
- Dynamic hero section with AI content (future)
- Testimonials, services, case studies
- Contact form connected to backend
- Automatic email responses (future AI)

### ✅ Careers Platform
- Job listings managed by admin
- Candidate application form
- Applications stored in Supabase
- AI-generated acknowledgment emails
- Resume upload + AI resume filtering (planned)

### ✅ Blog / News
- Admin can add/edit posts
- AI-generated SEO descriptions
- AI-powered summarization for long blogs

### ✅ Admin Dashboard (future)
- Login system (JWT-based)
- Manage:
  - Services
  - Projects
  - Careers
  - Blog posts
  - Testimonials
- AI-powered content generation buttons

### ✅ AI Tools
- Resume extraction + skill parsing
- Job fit analysis model
- Candidate scoring (planned)
- AI content generator for blog/testimonials/services

---

## 🛠 Tech Stack

### **Frontend**
- React + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query

### **Backend**
- Python Flask  
- Supabase (PostgreSQL)
- JWT Authentication  
- REST API architecture  

### **AI (Current & Future)**
- OpenAI / Anthropic models
- AI-generated:
  - Hero content
  - Testimonials
  - Case study summaries
  - Job descriptions
  - Resume insights

---

## 🚀 Getting Started

### ✅ Clone the Repo
```bash
git clone https://github.com/your-repo.git
cd your-project
```

### ✅ Install Frontend Dependencies
```bash
cd frontend
npm install
npm run dev
```

### ✅ Backend Setup

Create a virtual environment:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env` in backend:
```env
SUPABASE_URL=xxxxxxxxxx
SUPABASE_KEY=xxxxxxxxxx
JWT_SECRET=your_secret_key
FLASK_ENV=development
```

Run the server:
```bash
python app.py
```

---

## 📁 Project Structure
```
root/
│── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   └── (API routes, utils, models)
│
│── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── assets/
│   │   ├── main.tsx
│   │   └── App.tsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.ts
│
└── README.md
```

---

## 📄 Core Pages

### ✅ Home Page
- Hero banner
- Dynamic AI content (future)
- Service highlights
- Testimonials

### ✅ About Page
- Mission, vision, values
- AI-generated team descriptions

### ✅ Services Page
- AI-written service descriptions
- Optional AI chatbot assistant

### ✅ Projects Page
- Portfolio with filtering

### ✅ Contact Page
- Form connected to Flask backend
- Messages stored in Supabase
- Auto AI email replies (future)

### ✅ Careers Page
- Open job listings
- Application form
- AI-generated confirmation
- Resume upload + processing

### ✅ Blog Page
- AI-generated summaries
- Admin content management

---

## 🤖 AI Integration

### ✅ Implemented
- Backend structure ready for AI endpoints
- Frontend design for AI-generated content areas

### ✅ In Progress / Upcoming

**AI Resume Parser:**
- Extracts skills, experience, education
- Scores job-match percentage
- Converts resume into professional format

**AI Blog Tools:**
- Generate summaries
- SEO meta description creation

**AI Admin Tools:**
- Generate service descriptions
- Create testimonials
- Summarize client case studies

---

## 🧑‍💻 Development

Run frontend:
```bash
npm run dev
```

Run backend:
```bash
python app.py
```

Build frontend:
```bash
npm run build
```

Format / lint:
```bash
npm run lint
```

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues, suggestions, or pull requests.

---

## 📜 License

This project is licensed under MIT License.  
You are free to use, modify, and distribute it.

---

**Built with ❤️ by Mastersolis Infotech**# CICADA-project
# CICADA-project
