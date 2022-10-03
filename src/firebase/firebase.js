// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKI0E7GcSgsLyuDS3TZCdqVIGmRpUQMrg",
  authDomain: "adminpanel-34ab5.firebaseapp.com",
  projectId: "adminpanel-34ab5",
  storageBucket: "adminpanel-34ab5.appspot.com",
  messagingSenderId: "946714661312",
  appId: "1:946714661312:web:d6a9d5b503e55c2f6d3825",
  measurementId: "G-D3TX4C72JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);