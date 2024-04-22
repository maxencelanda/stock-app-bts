// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiUrl = process.env.EXPO_PUBLIC_FIREBASE_KEY
console.log(apiUrl)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiUrl,
  authDomain: "stockapp-583e4.firebaseapp.com",
  projectId: "stockapp-583e4",
  storageBucket: "stockapp-583e4.appspot.com",
  messagingSenderId: "861751968798",
  appId: "1:861751968798:web:add5596f745f7983f1da0f"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const firebase_db = getFirestore(firebase_app);