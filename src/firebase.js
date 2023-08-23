// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxwJJvALQ9OwxMZbfcYt33FGliZM66GKM",
  authDomain: "delivery-food-c1b3b.firebaseapp.com",
  projectId: "delivery-food-c1b3b",
  storageBucket: "delivery-food-c1b3b.appspot.com",
  messagingSenderId: "653839506994",
  appId: "1:653839506994:web:31196925463aab5756262b",
  measurementId: "G-5FQVN2JY78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Obtiene la instancia de autenticación

export { app, analytics, auth, createUserWithEmailAndPassword };