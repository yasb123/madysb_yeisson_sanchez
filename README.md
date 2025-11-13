# 🛍️ MADY'SB -- E-Commerce de Ropa Laboral

Este proyecto lo construí como parte de mi formación en React, con el
objetivo de entregar una tienda online funcional, organizada y fácil de
mantener. Quise enfocarme en crear una experiencia clara para el
usuario: navegación fluida, productos bien presentados y una estructura
profesional que permita escalar el proyecto a futuro.

Además, integré Firebase para manejar los productos desde Firestore de
manera segura, utilizando variables de entorno para proteger mis
credenciales.

------------------------------------------------------------------------

## 🧩 Tecnologías Principales

  -----------------------------------------------------------------------
  Tecnología                       Descripción
  -------------------------------- --------------------------------------
  **React + Vite**                 Framework moderno, rápido y modular.

  **Firebase**                     Firestore para datos en tiempo real y
                                   conexión segura a la base de
                                   productos.

  **CSS Modular**                  Estilos organizados por páginas y
                                   componentes.

  **Vercel**                       Plataforma utilizada para el
                                   despliegue final del proyecto.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## ⚙️ Estructura General del Proyecto

    (Se mantiene la misma estructura detallada que aparece en el repositorio y en la entrega.)

------------------------------------------------------------------------

## 🧠 Cómo Ejecutarlo en Local

### 1️⃣ Clonar el repositorio

``` bash
git clone https://github.com/yasb123/madysb_yeisson_sanchez.git
cd madysb_yeisson_sanchez
```

### 2️⃣ Instalar dependencias

``` bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env.local` con:

``` env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:abcdef0123456789
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
```

### 4️⃣ Ejecutar el proyecto

``` bash
npm run dev
```

Tu sitio estará disponible en\
http://localhost:5173

------------------------------------------------------------------------

## 🚀 Despliegue en Vercel

1.  Crear una cuenta en https://vercel.com\
2.  Conectar el repositorio de GitHub\
3.  En **Settings → Environment Variables**, agregar las credenciales de
    `.env.local`\
4.  Desplegar el proyecto\
5.  El dominio completo del despliegue es:

```{=html}
<!-- -->
```
    https://madysb-yeisson-sanchez.vercel.app/

------------------------------------------------------------------------

## 🔒 Seguridad y Buenas Prácticas

-   Nunca se sube `.env.local` al repositorio.\
-   Las claves de Firebase quedan protegidas en variables de entorno.\
-   Las reglas de Firestore se configuran para permitir solamente
    **lectura** de productos.

------------------------------------------------------------------------

## 💬 Autor

Proyecto desarrollado por **Yeisson Arturo Sánchez Bautista** como
entrega final del curso React. Dejé el proyecto funcional, optimizado y
desplegado, listo para revisión y futuras mejoras.
