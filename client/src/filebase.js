// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "max-blog-37178.firebaseapp.com",
  projectId: "max-blog-37178",
  storageBucket: "max-blog-37178.appspot.com",
  messagingSenderId: "1098820462797",
  appId: "1:1098820462797:web:c96c1fcd568573999de184"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

