import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import '../styles/ProductPreview.css';

function formatPrice(v){return v.toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});}

export default function ProductPreview(){
  const { id } = useParams();
  const product = PRODUCTS.find(p => String(p.id) === String(id)) || PRODUCTS[0];
  const [size, setSize] = React.useState(product.sizes[1] || product.sizes[0]);
  const [color, setColor] = React.useState(product.colors[0]);
  const [qty, setQty] = React.useState(1);
  const nav = useNavigate();

  function handleBuy(){
    try{
      const item = { id: product.id, size, color, qty };
      const cur = JSON.parse(localStorage.getItem('cart')||'[]');
      // if same product/color/size exists, sum qty
      const ix = cur.findIndex(it => it.id===item.id && it.size===item.size && it.color===item.color);
      if(ix>=0){ cur[ix].qty += item.qty; } else { cur.push(item); }
      localStorage.setItem('cart', JSON.stringify(cur));
      localStorage.setItem('cartConfirmed','1');
      try{ window.dispatchEvent(new Event('storage')); }catch{}
    }catch(e){ /* ignore storage errors */ }
    nav('/carrito');
  }

  return (
    <section className="preview-wrap">
      <div className="products-hero" aria-hidden="true"></div>
      <div className="preview-inner">
        <h1>Detalles del Producto</h1>
        <div className="preview-grid">
          <div className="preview-image">
            <img src={product.hero} alt={product.name} />
          </div>
          <div className="preview-info">
            <h2 className="pname">{product.name}</h2>
            <div className="pprice">{formatPrice(product.price)}</div>

            <div className="p-section">
              <div className="ptitle">Talla:</div>
              <div className="size-row">
                {product.sizes.map(s => (
                  <button key={s} className={size===s?'chip active':'chip'} onClick={()=>setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="p-section">
              <div className="ptitle">Color:</div>
              <div className="color-row">
                {product.colors.map(c => (
                  <button key={c} className={color===c?'dot active':'dot'} style={{'--clr':c}} onClick={()=>setColor(c)} />
                ))}
              </div>
            </div>

            <p className="quota">Paga hasta en 12 cuotas con tu tarjeta de crédito.</p>

            <div className="buy-row">
              <label className="ptitle">Cant</label>
              <select value={qty} onChange={e=>setQty(Number(e.target.value))}>
                {[1,2,3,4,5].map(n=>(<option key={n} value={n}>{n}</option>))}
              </select>
              <button className="buy-btn" onClick={handleBuy}>Comprar</button>
            </div>
          </div>
        </div>

        <hr className="divider"/>
        <div className="desc">
          <h3>Descripción del Producto</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
}
