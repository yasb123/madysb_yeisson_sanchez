// src/firebase/firebaseConfig.js
// Configuración e inicialización de Firebase para madysb-yeisson-sanchez.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTqVwhddyyU9-CLRAZmVTuKTurgOhz1Rs",
  authDomain: "madysb-yeisson-sanchez.firebaseapp.com",
  projectId: "madysb-yeisson-sanchez",
  storageBucket: "madysb-yeisson-sanchez.firebasestorage.app",
  messagingSenderId: "327544495458",
  appId: "1:327544495458:web:dd4b3342b73f5d3974203b",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("✅ Firebase inicializado correctamente:", app.name);
