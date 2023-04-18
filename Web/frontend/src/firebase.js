// src/firebase.js
import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {GoogleAuthProvider, getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCs7bBCj36dw8SnZpHrkWbU8UDoOdb7DcA",
  authDomain: "plant-disease-detection-system.firebaseapp.com",
  projectId: "plant-disease-detection-system",
  storageBucket: "plant-disease-detection-system.appspot.com",
  messagingSenderId: "663284861086",
  appId: "1:663284861086:web:fae60e184a525ed4f8938f"
};



// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app)