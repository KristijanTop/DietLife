import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD6I83eGXFFTZMmsTchZzo3PoT1t0yz92Y",
    authDomain: "dietlife-91285.firebaseapp.com",
    projectId: "dietlife-91285",
    storageBucket: "dietlife-91285.appspot.com",
    messagingSenderId: "24451319725",
    appId: "1:24451319725:web:2108e598ac4898ba728324"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export { firebase };