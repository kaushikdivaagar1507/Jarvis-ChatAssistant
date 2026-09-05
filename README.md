# 🤖 JARVIS AI Chat Assistant

> An intelligent AI-powered conversational assistant built with React, Node.js, Express, and Groq API.

JARVIS is a modern AI chat assistant designed to provide fast and intelligent responses through a clean, interactive web interface. The application uses a React frontend and a Node.js/Express backend, with the Groq API powering the AI responses.

---

## 🚀 Live Demo

🌐 **JARVIS AI Chat Assistant:**  
https://jarvis-chat-assistant.vercel.app

🔗 **Backend API:**  
https://jarvis-chatassistant-1.onrender.com

---

## ✨ Features

- 🤖 AI-powered conversational responses
- 💬 Real-time chat interface
- 📝 Markdown-formatted AI responses
- 📊 Proper rendering of tables and lists
- ⚡ Fast AI responses using Groq API
- 🎨 Modern dark/glassmorphism UI
- 📱 Responsive design
- 🔄 Separate frontend and backend architecture
- 🔐 API key securely stored in backend environment variables
- 🌐 Deployed using Vercel and Render

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      User Browser    │
                    │                      │
                    │   React + Vite UI    │
                    └──────────┬───────────┘
                               │
                               │ POST /api/chat
                               ▼
                    ┌──────────────────────┐
                    │    Express Backend   │
                    │                      │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
                               │ API Request
                               ▼
                    ┌──────────────────────┐
                    │      Groq API        │
                    │                      │
                    │   AI Model Response  │
                    └──────────┬───────────┘
                               │
                               │ AI Answer
                               ▼
                    ┌──────────────────────┐
                    │    JARVIS Frontend   │
                    │                      │
                    │   Formatted Output   │
                    └──────────────────────┘
