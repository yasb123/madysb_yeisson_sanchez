// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Componentes reutilizables
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductPreview from "./pages/ProductPreview.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Payments from "./pages/Payments.jsx";

// 404 removido
function RemovedNotFound() {
  return (
    <section style={{ padding: "2rem" }}>
      <h1>Página no encontrada</h1>
      <p>La ruta solicitada no existe.</p>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-wrap">
      <Navbar />

      <main>
        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Home />} />

          {/* Productos */}
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductPreview />} />

          {/* Información */}
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/pagos" element={<Payments />} />

          {/* 404 */}} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
