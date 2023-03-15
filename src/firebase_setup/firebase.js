// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBu3wHn3adlXcnWDqIvGuQk18KcM5G9ag",
  authDomain: "appclubes-18dd5.firebaseapp.com",
  databaseURL: "https://appclubes-18dd5-default-rtdb.firebaseio.com",
  projectId: "appclubes-18dd5",
  storageBucket: "appclubes-18dd5.appspot.com",
  messagingSenderId: "425275349671",
  appId: "1:425275349671:web:3b33c5414d3fc0abb75982",
  measurementId: "G-9YER0C3VC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)