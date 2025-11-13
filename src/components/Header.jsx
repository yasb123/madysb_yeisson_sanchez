import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

function getCartHasItems() {
  try {
    const raw = localStorage.getItem('cart');
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return false;
    return parsed.some(it => (it?.qty || 1) > 0);
  } catch {
    return false;
  }
}

function useCartDot() {
  const [hasItems, setHasItems] = React.useState(false);

  React.useEffect(() => {
    const read = () => {
      setHasItems(getCartHasItems());
    };

    // Leer al montar
    read();

    // Poll suave cada 300ms
    const interval = setInterval(read, 300);

    // Escuchar cambios desde otras pestañas
    const onStorage = (e) => {
      if (!e.key || e.key === 'cart') read();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return hasItems;
}

export default function Header() {
  const hasCartItems = useCartDot();

  return (
    <header className="mady-header">
      <div className="mady-header-inner">
        <NavLink to="/" className="mady-logo">
          Mady&apos;SB
        </NavLink>

        <nav className="mady-nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>

          <NavLink to="/carrito" className="mady-cart-link">
            <span className="cart-icon" aria-label="Carrito">🛒</span>
            {hasCartItems && <span className="cart-dot" />}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
