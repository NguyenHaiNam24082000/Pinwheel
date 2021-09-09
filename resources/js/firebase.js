// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI-8phQWGToO6TJN6J4_Yf0HCW4ImZjA4",
  authDomain: "pinwheel-chat.firebaseapp.com",
  projectId: "pinwheel-chat",
  storageBucket: "pinwheel-chat.appspot.com",
  messagingSenderId: "383090240740",
  appId: "1:383090240740:web:37a05119f4e3a0a837d0f1",
  measurementId: "G-4JGNMJTXQS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();

export {auth};