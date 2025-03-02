/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxpsaPpV6_CMPStcT5rSgZa4iV8DyKhtM",
  authDomain: "nextire-ed746.firebaseapp.com",
  projectId: "nextire-ed746",
  storageBucket: "nextire-ed746.firebasestorage.app",
  messagingSenderId: "877671527706",
  appId: "1:877671527706:web:1b58f4b5aca9a58e3668a3",
  measurementId: "G-T4BWYWN13C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }