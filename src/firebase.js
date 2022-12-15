// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASERh2H50H63W-qDGQjn8rNL7HVZKJG_U",
  authDomain: "chat-e42eb.firebaseapp.com",
  projectId: "chat-e42eb",
  storageBucket: "chat-e42eb.appspot.com",
  messagingSenderId: "212481053695",
  appId: "1:212481053695:web:d79c4f4b00165b477b4dca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()
export const storage = getStorage()

export const provider = new GoogleAuthProvider()

export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
}