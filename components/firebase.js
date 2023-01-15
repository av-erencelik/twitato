import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBFx-l4I7gfvOQNDkUAexLOG6LLpDpeAuI",
  authDomain: "twitato-8b510.firebaseapp.com",
  projectId: "twitato-8b510",
  storageBucket: "twitato-8b510.appspot.com",
  messagingSenderId: "702640937304",
  appId: "1:702640937304:web:d3c665f73cd3bdb375ad2d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
