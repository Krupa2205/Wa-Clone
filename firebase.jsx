// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//auth import ->step2
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPdsCDr8zQu8xB5bpgRHXLnJV7Te7mt-E",
  authDomain: "wa-clone-522b8.firebaseapp.com",
  projectId: "wa-clone-522b8",
  storageBucket: "wa-clone-522b8.appspot.com",
  messagingSenderId: "600572719910",
  appId: "1:600572719910:web:f8ef153605426f31d947e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth step->2
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();
export {auth,db,storage}