import { initializeApp, getApps, getApp  } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABDEHAs2p5og4BA1bux4RcpUuIhDmCg4U",
  authDomain: "mock-interview-platform-dd187.firebaseapp.com",
  projectId: "mock-interview-platform-dd187",
  storageBucket: "mock-interview-platform-dd187.firebasestorage.app",
  messagingSenderId: "26686476825",
  appId: "1:26686476825:web:b08d019b75d6edb4e75088"
};

// Initialize app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);