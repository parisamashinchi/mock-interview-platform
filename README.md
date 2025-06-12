# 🧠 AI Job Interview Platform

An AI-powered job interview platform built with **Next.js**, **Firebase**, **TailwindCSS**, and **Vapi AI Voice Agents**. This platform lets users simulate job interviews using voice-based AI agents, Google Gemini, and stores data securely via Firebase.

---

## 🚀 Tech Stack

- **Next.js** – Frontend and backend logic
- **Firebase** – Authentication and real-time database
- **Tailwind CSS** – Utility-first UI styling
- **Vapi AI** – Voice agent API for conversational interviews
- **shadcn/ui** – Modern and accessible UI components
- **Google Gemini** – AI for generating intelligent interview questions
- **Zod** – Schema validation and type safety

---

## ✨ Features

- 🔐 **Authentication**: Sign up and sign in with email/password via Firebase Auth.
- 🧑‍💼 **Create Interviews**: Generate mock interviews using Vapi voice assistants and Google Gemini prompts.
- 🎙️ **Interview Page**: Conduct AI-driven voice interviews and view detailed transcripts.

---

## ⚡ Quick Start

### 1. Clone the Repository

### 2. install dependency
```
npm install
```
### 3. Set Up Environment Variables
    Create a .env.local file in the root directory of your project and add the following:


```
env
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GOOGLE_GENERATIVE_AI_API_KEY=
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
```

🔑 Replace the placeholder values with your actual Firebase, Google Gemini, and Vapi credentials.

### 4. Run the Development Server
```
npm run dev
```
    
Then open http://localhost:3000 in your browser to use the app.

## 📝 Notes
Ensure Firebase Firestore and Authentication are enabled in your Firebase Console.

Make sure your Vapi workflow is set up with appropriate variables like username.

Enable and configure the Google Gemini API in your Google Cloud Console to get the API key.

## 🤝 Contributions

Contributions are welcome! Feel free to:

Open issues for bugs or ideas

Submit pull requests

Fork and customize the project for your own use


## 👤 Author
Made with ❤️ by Your Parisa


















        
