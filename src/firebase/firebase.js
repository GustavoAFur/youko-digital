import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const key = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: "youko-app.firebaseapp.com",
  projectId: "youko-app",
  storageBucket: "youko-app.appspot.com",
  messagingSenderId: "812797976015",
  appId: "1:812797976015:web:a96aea9c0101688fa8c6ba",
  measurementId: "G-0FJ5DNJYC8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
