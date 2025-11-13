import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductPreview from './pages/ProductPreview.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Payments from './pages/Payments.jsx';

import './styles/App.css';

export default function App() {
  return (
    <div className="app-wrap">
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductPreview />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/pagos" element={<Payments />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
