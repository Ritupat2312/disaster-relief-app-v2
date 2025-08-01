// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsuqYAjsQikegn0ezx8VEjU2XmIMyXupM",
  authDomain: "disasterreliefapp-9bdb3.firebaseapp.com",
  databaseURL: "https://disasterreliefapp-9bdb3-default-rtdb.firebaseio.com",
  projectId: "disasterreliefapp-9bdb3",
  storageBucket: "disasterreliefapp-9bdb3.appspot.com", // <-- CORRECTED THIS LINE
  messagingSenderId: "1095526576616",
  appId: "1:1095526576616:web:b6aea56f20159ecc93345d",
  measurementId: "G-RSYJVZEYCM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);