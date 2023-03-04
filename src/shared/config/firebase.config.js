import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMHNyFkHeLY2usk-80Ont9gngEC8RM2iY",
  authDomain: "mindcard-7253b.firebaseapp.com",
  projectId: "mindcard-7253b",
  storageBucket: "mindcard-7253b.appspot.com",
  messagingSenderId: "885407868413",
  appId: "1:885407868413:web:eef8a01b76a42e91f8a594",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage, auth };
