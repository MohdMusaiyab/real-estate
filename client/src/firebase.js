// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-63272.firebaseapp.com",
  projectId: "mern-estate-63272",
  storageBucket: "mern-estate-63272.appspot.com",
  messagingSenderId: "545661317261",
  appId: "1:545661317261:web:d94d25854d108cc35ab2c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);