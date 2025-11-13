import React from 'react';

function cartHasItems() {
  try {
    const raw = localStorage.getItem('cart');
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return false;
    return parsed.some(it => (it?.qty || 1) > 0);
  } catch {
    return false;
  }
}

export default function CartDotWatcher() {
  React.useEffect(() => {
    const update = () => {
      const has = cartHasItems();
      const dots = document.querySelectorAll('.cart-dot');
      dots.forEach(dot => {
        if (!dot) return;
        dot.style.display = has ? 'block' : 'none';
      });
    };

    // Ejecutar al montar
    update();

    // Poll suave para reflejar cambios en Cart y Payments sin tocar su código
    const interval = setInterval(update, 300);

    // Escuchar cambios de localStorage (otras pestañas)
    const onStorage = (e) => {
      if (!e.key || e.key === 'cart') update();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return null;
}
