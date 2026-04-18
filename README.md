# 🧠 AI Backend Service (Chat + Content Safety + Vision)

## 🚀 Overview

A scalable Node.js backend integrating:

* GPT-5 Chat (Azure OpenAI)
* Azure Content Safety (input moderation)
* Azure Computer Vision (image analysis)

Built using a modular architecture with clean separation of concerns.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* Azure OpenAI (gpt-5-chat)
* Azure Content Safety
* Azure Computer Vision
* REST APIs
* Axios

---

## 📁 Project Structure

src/
├── modules/
│    ├── chat/
│    │    ├── chat.routes.js
│    │    ├── chat.controller.js
│    │    └── chat.service.js
│    │
│    ├── SafeChat/
│    │    ├── safeChat.routes.js
│    │    ├── safeChat.controller.js
│    │    └── safeChat.service.js
│    │
│    ├── Vision/
│    │    ├── vision.routes.js
│    │    ├── vision.controller.js
│    │    └── vision.service.js
│
├── app.js
└── server.js

---

## 🔄 System Flow

Client Request
↓
Express App (app.js)
↓
Route Layer (/api/*)
↓
Controller
↓
Service Layer
├── Content Safety (Azure)
├── Chat (GPT-5)
└── Vision (Azure)
↓
Response Formatter
↓
Client Response

---

## 🔷 Module Design Pattern

Each module follows:

* Routes → API endpoints
* Controller → request/response handling
* Service → business logic & Azure integration

---

## 🔷 Core Modules

### 📌 Chat Module

* Uses Azure OpenAI (gpt-5-chat)
* Handles conversational AI
* Supports dynamic system prompts

---

### 📌 Safe Chat Module (Azure Content Safety)

* Uses Azure Content Safety resource
* Moderates user input before AI processing
* Detects:

  * Hate
  * Violence
  * Self-harm
  * Sexual content
* Blocks or sanitizes unsafe queries

---

### 📌 Vision Module

* Uses Azure Computer Vision API
* Detects:

  * Caption
  * Tags
  * Objects
  * Faces
  * Brands
  * Colors
  * Categories
* Returns only detected attributes

---

## 🔷 API Endpoints

POST /api/chat
POST /api/safe-chat
POST /api/vision/analyze-image
GET /api/chat/get

---

## 🔷 Request Examples

### Chat

{
"message": "Explain closures in JavaScript"
}

### Safe Chat

{
"message": "User input to be validated"
}

### Vision

{
"imageUrl": "https://example.com/image.jpg"
}

---

## 🔷 Key Features

* Modular architecture (feature-based)
* Azure-native AI integrations
* Content moderation using Azure Content Safety
* Clean controller → service pattern
* Dynamic AI response handling
* Structured image analysis output
* Scalable and extensible system

---

## 🔷 Design Principles

* Separation of concerns
* Extensibility
* Low coupling
* Consistent module pattern
* Secure AI interactions

---

## 🔷 Adding New Modules

1. Create a folder inside `modules/`
2. Add:

   * routes
   * controller
   * service
3. Register in `app.js`

No changes required in existing modules.

---

## 🔷 Future Enhancements

* OCR Module (Read API)
* RAG (Search + Embeddings)
* Authentication & Authorization
* Blob Storage integration
* AI workflow orchestration

---

## 🧩 Summary

This backend demonstrates:

* Real-world AI system design
* Integration of GPT + Vision + Content Safety
* Secure and scalable architecture
* Modular backend development approach
