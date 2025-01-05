import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGFgd8qU8NCdC6Gya_btE_RG_pzNgGDvA",
  authDomain: "store-app-eeb56.firebaseapp.com",
  databaseURL: "https://store-app-eeb56-default-rtdb.firebaseio.com",
  projectId: "store-app-eeb56",
  storageBucket: "store-app-eeb56.appspot.com",
  messagingSenderId: "757147722360",
  appId: "1:757147722360:web:935fce9deca6f04391038d",
  measurementId: "G-L102RMT5ND",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
