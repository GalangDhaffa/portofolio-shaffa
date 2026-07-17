import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFkNd3LKDgH3gdWSGmwRedzqf3Onkwy5E",
  authDomain: "ptp-shaffa.firebaseapp.com",
  projectId: "ptp-shaffa",
  storageBucket: "ptp-shaffa.firebasestorage.app",
  messagingSenderId: "148946722197",
  appId: "1:148946722197:web:cf8e22e0ad99d4813a2a9c",
  measurementId: "G-3DMBRSMJXE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
