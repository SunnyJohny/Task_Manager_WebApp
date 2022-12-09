// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { initializeApp } from 'firebase/app';
// import {
//   getFirestore,
//   doc,
//   getDocs,
//   getDoc,
//   setDoc,
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
// } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getFirestore } from 'firebase/firestore';
// import {
//   getStorage,
//   ref as sRef,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
//   ref,
// } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyC7l9mCunGoa2Hl8iIfFg5_ABUs8A-7l54",
  authDomain: "fir-javascript-43f66.firebaseapp.com",
  projectId: "fir-javascript-43f66",
  storageBucket: "fir-javascript-43f66.appspot.com",
  messagingSenderId: "162795189093",
  appId: "1:162795189093:web:cf0e95a7c0fe3b77a5678c",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestore Database


export const clouddb = getFirestore(app);

