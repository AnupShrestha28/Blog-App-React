import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgv2xZWVWKKLaXxckc0VMocqCl5jvZNHM",
  authDomain: "blogproject-671ba.firebaseapp.com",
  projectId: "blogproject-671ba",
  storageBucket: "blogproject-671ba.appspot.com",
  messagingSenderId: "985704003709",
  appId: "1:985704003709:web:9c8bfeaad25747ac289914",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
