# 🛍️ MADY’SB – E-Commerce de Ropa Laboral

**MADY’SB** es un sitio web de comercio electrónico ideado para clientes que buscan la mejor ropa para su trabajo.  
Desarrollado con **React + Vite**, el proyecto se integra con **Firebase (Firestore y Hosting)** para la gestión de productos, almacenamiento de datos y futuras funcionalidades de autenticación.  

Su diseño se centra en la **usabilidad**, la **experiencia de compra fluida** y una **arquitectura escalable**, pensada para un crecimiento sostenible en el entorno digital.

---

## 🧩 Tecnologías Principales

| Tecnología | Descripción |
|-------------|-------------|
| **React + Vite** | Framework moderno con recarga rápida y modularidad. |
| **Firebase** | Base de datos Firestore para gestión en tiempo real y alojamiento seguro. |
| **CSS Modular** | Diseño responsive, limpio y adaptable. |
| **Vercel** | Plataforma de despliegue elegida para MADY’SB por su velocidad y estabilidad. |

---

## ⚙️ Estructura General del Proyecto

```
madysb_yeisson_sanchez/
│
├── 📁 public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   │
│   ├── 📁 images/
│   │   ├── 📁 inicio/
│   │   │   ├── banner.jpg
│   │   │   ├── portada.jpg
│   │   │   └── logo.png
│   │   │
│   │   ├── 📁 productos/
│   │   │   ├── producto1_color1.jpg
│   │   │   ├── producto1_color2.jpg
│   │   │   ├── producto2_color1.jpg
│   │   │   ├── producto2_color2.jpg
│   │   │   ├── producto3_color1.jpg
│   │   │   ├── producto3_color2.jpg
│   │   │   ├── producto4_color1.jpg
│   │   │   ├── producto4_color2.jpg
│   │   │   ├── producto5_color1.jpg
│   │   │   ├── producto5_color2.jpg
│   │   │   ├── producto6_color1.jpg
│   │   │   ├── producto6_color2.jpg
│   │   │   ├── producto7_color1.jpg
│   │   │   ├── producto7_color2.jpg
│   │   │   ├── producto8_color1.jpg
│   │   │   ├── producto8_color2.jpg
│   │   │
│   │   ├── 📁 nosotros/
│   │   │   ├── equipo.jpg
│   │   │   ├── fabrica.jpg
│   │   │   └── sostenibilidad.jpg
│   │   │
│   │   ├── 📁 contacto/
│   │   │   ├── mapa.png
│   │   │   └── redes.jpg
│   │   │
│   │   ├── 📁 carrito/
│   │   │   ├── carrito_vacio.png
│   │   │   └── resumen_compra.jpg
│   │   │
│   │   └── 📁 pagos/
│   │       ├── tarjeta.png
│   │       └── pasarela_bancaria.jpg
│   │
│   └── 📁 icons/
│       ├── logo192.png
│       └── logo512.png
│
│
├── 📁 src/
│   ├── App.jsx
│   ├── main.jsx
│   │
│   ├── 📁 components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── CardProduct.jsx
│   │
│   ├── 📁 pages/
│   │   ├── Home.jsx              ← Página de inicio
│   │   ├── Products.jsx          ← Catálogo de productos
│   │   ├── ProductPreview.jsx    ← Vista individual del producto
│   │   ├── AboutUs.jsx           ← Sección “Nosotros”
│   │   ├── Contact.jsx           ← Formulario de contacto
│   │   ├── Cart.jsx              ← Carrito de compras
│   │   └── Payments.jsx          ← Pasarela de pago
│   │
│   ├── 📁 firebase/
│   │   ├── firebaseConfig.js     ← Configuración segura con .env.local
│   │   └── seedProducts.js       ← Carga inicial de productos en Firestore
│   │
│   ├── 📁 data/
│   │   └── products.js           ← Catálogo base de productos
│   │
│   └── 📁 styles/
│       ├── App.css
│       ├── Home.css
│       ├── Products.css
│       ├── AboutUs.css
│       ├── Contact.css
│       ├── Cart.css
│       └── Payments.css
│
├── package.json
├── vite.config.js
├── .env.local
├── .gitignore
└── README.md
```

---

## 🧠 Cómo Ejecutarlo en Local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/madysb_yeisson_sanchez.git
cd madysb_yeisson_sanchez
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar Firebase
Crea un archivo `.env.local` con tus variables (ya protegidas):
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:abcdef0123456789
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
```

### 4️⃣ Ejecutar el proyecto
```bash
npm run dev
```
Tu sitio quedará disponible en [http://localhost:5173](http://localhost:5173)

---

## 🚀 Despliegue en Vercel

1. Crea una cuenta en [https://vercel.com](https://vercel.com).  
2. Conecta tu repositorio de GitHub.  
3. En la sección **Settings → Environment Variables**, agrega las variables del `.env.local`.  
4. Guarda y despliega.  
5. Vercel te asignará un dominio público, por ejemplo:  
   ```
   https://madysb.vercel.app/
   ```

---

## 🔒 Seguridad y Buenas Prácticas

- **No subir** archivo `.env.local` a GitHub (ya está en `.gitignore`).  
- Las claves del SDK de Firebase **no son secretas**, pero las reglas de Firestore deben limitar la escritura:  
  ```js
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /products/{doc} {
        allow read;
        allow write: if false;
      }
    }
  }
  ```
- Usa `.env.example` como plantilla para compartir configuraciones seguras.

---

## 💬 Créditos

Proyecto desarrollado por **Yeisson Arturo Sánchez Bautista**,  
**Entrega final de curso REACT JS para Coderhouse** y apasionado por la innovación digital y la creación de soluciones sostenibles.
