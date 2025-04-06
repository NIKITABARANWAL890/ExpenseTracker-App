// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2ZbHvvb0ffEFf0cbHxntgtDMhrjpdcWM",
  authDomain: "expense-tracker-app-2bab5.firebaseapp.com",
  projectId: "expense-tracker-app-2bab5",
  storageBucket: "expense-tracker-app-2bab5.firebasestorage.app",
  messagingSenderId: "734335370939",
  appId: "1:734335370939:web:733faa4bd7b9ac3acd8b9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);