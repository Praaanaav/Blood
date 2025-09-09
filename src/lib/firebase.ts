// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "bloodbank-landing",
  "appId": "1:904297118011:web:22f040ba1cd8b793c11f1e",
  "storageBucket": "bloodbank-landing.firebasestorage.app",
  "apiKey": "AIzaSyAAX6tL2yKXPbYcHQnumNq2y4vL7UJ22KM",
  "authDomain": "bloodbank-landing.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "904297118011"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
