import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import '../styles/Cart.css';

function formatCOP(v) {
  return Number(v || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });
}

function getProductById(id) {
  return PRODUCTS.find(p => Number(p.id) === Number(id));
}

export default function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = React.useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [city, setCity] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [extra, setExtra] = React.useState('');
  const [shipType, setShipType] = React.useState('fast');

  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const isEmpty = items.length === 0;

  const subtotal = items.reduce((acc, it) => {
    const p = getProductById(it.id);
    const qty = it.qty || 1;
    return acc + (p ? p.price * qty : 0);
  }, 0);

  const shipping = isEmpty ? 0 : shipType === 'fast' ? 10000 : 6000;
  const iva = Math.round(subtotal * 0.19);
  const rete = Math.round(subtotal * 0.025);
  const discount = 0;
  const total = subtotal + shipping + iva - rete - discount;

  const updateQty = (index, delta) => {
    setItems(prev => {
      const next = [...prev];
      const current = next[index];
      if (!current) return prev;
      const currentQty = current.qty || 1;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        next.splice(index, 1);
        return next;
      }
      if (newQty > 20) {
        current.qty = 20;
      } else {
        current.qty = newQty;
      }
      next[index] = current;
      return next;
    });
  };

  const removeItem = (index) => {
    setItems(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const handlePay = () => {
    if (isEmpty) return;
    try {
      localStorage.setItem('checkoutTotal', String(total));
    } catch {}
    navigate('/pagos');
  };

  return (
    <div className="cart-page">
      <div className="cart-hero" />

      <section className="cart-container">
        <h1 className="cart-title">Tu domicilio</h1>

        <div className="cart-grid">
          <div className="cart-left">
            <label className="cart-label">
              Ciudad
              <input
                className="cart-input"
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Ej: Bogotá"
              />
            </label>

            <label className="cart-label">
              Teléfono
              <input
                className="cart-input"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Cel / WhatsApp"
              />
            </label>

            <label className="cart-label">
              Dirección
              <input
                className="cart-input"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Dirección de entrega"
              />
            </label>

            <label className="cart-label">
              Datos extra
              <textarea
                className="cart-textarea"
                rows={4}
                value={extra}
                onChange={e => setExtra(e.target.value)}
                placeholder="Punto de referencia, torre, apartamento, comentarios..."
              />
            </label>

            <hr className="cart-separator" />

            <div className="shipping-box">
              <h3 className="shipping-title">Costo de domicilio</h3>
              <label className="shipping-option">
                <input
                  type="radio"
                  name="shipping"
                  value="fast"
                  checked={shipType === 'fast'}
                  onChange={e => setShipType(e.target.value)}
                />
                <span>Para mañana: {formatCOP(10000)}</span>
              </label>
              <label className="shipping-option">
                <input
                  type="radio"
                  name="shipping"
                  value="slow"
                  checked={shipType === 'slow'}
                  onChange={e => setShipType(e.target.value)}
                />
                <span>De 4 a 5 días: {formatCOP(6000)}</span>
              </label>
            </div>
          </div>

          <div className="cart-right">
            {isEmpty ? (
              <div className="empty-cart">
                <p>Tu carrito está vacío.</p>
                <button
                  className="btn primary"
                  onClick={() => navigate('/productos')}
                >
                  Ver productos
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((it, idx) => {
                    const p = getProductById(it.id);
                    if (!p) return null;
                    const qty = it.qty || 1;

                    return (
                      <div className="cart-item" key={`${it.id}-${idx}`}>
                        <div className="cart-item-thumb" />
                        <div className="cart-item-info">
                          <div className="cart-item-name">{p.name}</div>
                          {it.size && (
                            <div className="cart-item-meta">Talla {it.size}</div>
                          )}
                          {it.color && (
                            <div className="cart-item-meta">Color {it.color}</div>
                          )}
                          <div className="cart-item-price">
                            {formatCOP(p.price)}
                          </div>
                          <div className="cart-item-qty">
                            <span>Cant: {qty}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQty(idx, +1)}
                              disabled={qty >= 20}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQty(idx, -1)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => removeItem(idx)}
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr className="cart-separator" />

                <div className="totals-grid">
                  <div></div>
                  <div className="totals-right">
                    <div className="totals-row">
                      <span>Sub Total:</span>
                      <span>{formatCOP(subtotal)}</span>
                    </div>
                    <div className="totals-row">
                      <span>Domicilio:</span>
                      <span>{formatCOP(shipping)}</span>
                    </div>
                    <div className="totals-row">
                      <span>Tarifa IVA 19%:</span>
                      <span>{formatCOP(iva)}</span>
                    </div>
                    <div className="totals-row">
                      <span>Tarifa Retefuente 2.5%:</span>
                      <span>{formatCOP(rete)}</span>
                    </div>
                    <div className="totals-row">
                      <span>Descuento:</span>
                      <span>No Aplica</span>
                    </div>
                    <div className="totals-row totals-strong">
                      <span>Total a pagar:</span>
                      <span>{formatCOP(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="cart-actions">
                  <button
                    className="btn ghost"
                    onClick={() => navigate('/productos')}
                  >
                    Seguir Comprando
                  </button>
                  <button
                    className="btn primary"
                    onClick={handlePay}
                    disabled={isEmpty}
                  >
                    Pagar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
