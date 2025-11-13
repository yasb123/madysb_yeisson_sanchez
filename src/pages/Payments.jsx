import React from 'react';
import '../styles/Payments.css';

function formatCOP(v) {
  return Number(v || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });
}

const BANKS = [
  { value: 'bancolombia', label: 'Bancolombia' },
  { value: 'davivienda', label: 'Davivienda' },
  { value: 'bogota', label: 'Banco de Bogotá' },
  { value: 'occidente', label: 'Banco de Occidente' },
  { value: 'bbva', label: 'BBVA' },
  { value: 'avvillas', label: 'Banco AV Villas' },
  { value: 'cajasocial', label: 'Banco Caja Social' },
  { value: 'agrario', label: 'Banco Agrario' },
  { value: 'pichincha', label: 'Banco Pichincha' },
  { value: 'nequi', label: 'Nequi' },
  { value: 'daviplata', label: 'Daviplata' },
];

const BANK_URLS = {
  bancolombia: 'https://www.bancolombia.com/personas',
  davivienda: 'https://www.davivienda.com/portal/persona',
  bogota: 'https://www.bancodebogota.com/',
  occidente: 'https://www.bancodeoccidente.com.co/',
  bbva: 'https://www.bbva.com.co/',
  avvillas: 'https://www.avvillas.com.co/',
  cajasocial: 'https://www.bancocajasocial.com/',
  agrario: 'https://www.bancoagrario.gov.co/',
  pichincha: 'https://www.pichincha.com.co/',
  nequi: 'https://www.nequi.com.co/',
  daviplata: 'https://www.daviplata.com/',
};

function isAlpha(str) {
  return /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(str.trim());
}
function isCard16(str) {
  return /^[0-9]{16}$/.test(str.replace(/\s+/g, ''));
}
function isThru(str) {
  return /^(0[1-9]|1[0-2])\/\d{2}$/.test(str.trim());
}
function isCVC(str) {
  return /^[0-9]{3,4}$/.test(str.trim());
}

export default function Payments() {
  const [personType, setPersonType] = React.useState('natural');
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [thru, setThru] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [bank, setBank] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    try {
      const t = Number(localStorage.getItem('checkoutTotal') || 0);
      setTotal(t);
    } catch {
      setTotal(0);
    }
  }, []);

  const clearCartAndTotal = () => {
    try {
      localStorage.removeItem('cart');
      localStorage.removeItem('checkoutTotal');
    } catch {}
  };

  const cardValid =
    isAlpha(nombre) &&
    isAlpha(apellido) &&
    isCard16(numero) &&
    isThru(thru) &&
    isCVC(cvc) &&
    total > 0;

  const onPayCard = (e) => {
    e.preventDefault();
    if (!cardValid) return;
    clearCartAndTotal();
    setSuccess(true);
  };

  const onPayPSE = (e) => {
    e.preventDefault();
    if (!bank || total <= 0) return;

    const url = BANK_URLS[bank] || 'https://www.pse.com.co/persona';
    try {
      window.open(url, '_blank', 'noopener');
    } catch {}

    clearCartAndTotal();
    // Forzar recarga completa para que el header lea el carrito vacío
    window.location.href = '/productos';
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    // Forzar recarga completa para asegurar que el header vuelva a leer localStorage
    window.location.href = '/productos';
  };

  return (
    <div className="pay-page">
      <div className="pay-hero" />
      <section className="pay-container">
        <header className="pay-header">
          <h1>Detalles del Pago</h1>
          <div className="pay-total-box">
            <span>Total a pagar</span>
            <strong>{formatCOP(total)}</strong>
          </div>
        </header>

        <div className="pay-person-row">
          <span className="pay-label">Tipo de persona:</span>
          <label className="pay-radio">
            <input
              type="radio"
              name="person"
              value="natural"
              checked={personType === 'natural'}
              onChange={() => setPersonType('natural')}
            />
            <span>Persona Natural</span>
          </label>
          <label className="pay-radio">
            <input
              type="radio"
              name="person"
              value="juridica"
              checked={personType === 'juridica'}
              onChange={() => setPersonType('juridica')}
            />
            <span>Persona Jurídica</span>
          </label>
        </div>

        <section className="pay-card-section">
          <div className="pay-card-logos">
            <span className="logo-circle mc" />
            <span className="logo-circle visa" />
          </div>
          <form className="pay-card-form" onSubmit={onPayCard}>
            <label className="pay-field">
              Nombre
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre del titular"
                required
              />
            </label>
            <label className="pay-field">
              Apellido
              <input
                type="text"
                value={apellido}
                onChange={e => setApellido(e.target.value)}
                placeholder="Apellido del titular"
                required
              />
            </label>
            <label className="pay-field">
              Número de Tarjeta
              <input
                type="text"
                maxLength={19}
                value={numero}
                onChange={e =>
                  setNumero(e.target.value.replace(/[^\d ]/g, ''))
                }
                placeholder="•••• •••• •••• ••••"
                required
              />
            </label>
            <div className="pay-row-2">
              <label className="pay-field">
                THRU
                <input
                  type="text"
                  maxLength={5}
                  value={thru}
                  onChange={e => setThru(e.target.value)}
                  placeholder="MM/AA"
                  required
                />
              </label>
              <label className="pay-field">
                CVC
                <input
                  type="password"
                  maxLength={4}
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  placeholder="•••"
                  required
                />
              </label>
            </div>
            <button
              className="btn primary pay-btn"
              type="submit"
              disabled={!cardValid}
            >
              Pagar
            </button>
          </form>
        </section>

        <hr className="pay-divider" />

        <section className="pay-pse-section">
          <div className="pay-pse-header">
            <span className="pse-logo" />
            <h2>Pago con PSE</h2>
          </div>
          <form className="pay-pse-form" onSubmit={onPayPSE}>
            <label className="pay-field">
              Elige tu banco
              <select
                value={bank}
                onChange={e => setBank(e.target.value)}
                required
              >
                <option value="">Selecciona una opción</option>
                {BANKS.map(b => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn primary pay-btn" type="submit">
              Pagar
            </button>
          </form>
        </section>

        <p className="pay-secure">
          Transacción segura ▪ Todos tus datos están protegidos
        </p>

        {success && (
          <div className="pay-modal-backdrop" role="dialog" aria-modal="true">
            <div className="pay-modal">
              <h3>¡Pago exitoso!</h3>
              <p>Hemos registrado tu compra correctamente.</p>
              <button className="btn primary" onClick={handleCloseSuccess}>
                Continuar
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
