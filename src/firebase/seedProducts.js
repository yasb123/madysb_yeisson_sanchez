// src/firebase/seedProducts.js
// Sube todos los productos definidos en src/data/products.js a la colección "products" en Firestore.
// Se ejecuta solo una vez en desarrollo usando un flag en localStorage.

import { db } from "./firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { PRODUCTS } from "../data/products";

export async function seedProductsOnce() {
  if (typeof window === "undefined") return;

  const alreadySeeded = localStorage.getItem("madysb_products_seeded");
  if (alreadySeeded) {
    return;
  }

  try {
    const colRef = collection(db, "products");

    for (const product of PRODUCTS) {
      const docId = String(product.id ?? "");
      const docRef = doc(colRef, docId || undefined);

      await setDoc(docRef, {
        ...product,
      });
    }

    localStorage.setItem("madysb_products_seeded", "1");
    console.log("✅ Productos cargados en Firestore (seed ejecutado una vez)");
  } catch (error) {
    console.error("❌ Error al sembrar productos en Firestore:", error);
  }
}
