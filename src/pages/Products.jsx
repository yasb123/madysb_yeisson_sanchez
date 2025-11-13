import { useMemo, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Products.css';
import { PRODUCTS, ALL_COLORS, ALL_SIZES, ALL_GENDERS } from '../data/products';

const CATS = ['camisas','pantalones','uniformes','chaquetas'];

function useQuery(){ const { search } = useLocation(); return useMemo(()=> new URLSearchParams(search), [search]); }
function formatPrice(v){ return v.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }); }

export default function Products(){
  const q = useQuery();
  const nav = useNavigate();

  const [open, setOpen] = useState({cat:true, gen:true, size:true, color:true});
  const [sortBy, setSortBy] = useState('reciente');

  const selectedCat = (q.get('categoria') || '').toLowerCase();
  const [gender, setGender] = useState(q.get('genero') || '');
  const [size, setSize]     = useState(q.get('talla') || '');
  const [color, setColor]   = useState(q.get('color') || '');

  useEffect(()=>{
    if (selectedCat) { const el = document.getElementById('filtros'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }, [selectedCat]);

  const updateParam = (key, value)=>{
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value); else params.delete(key);
    nav({ pathname: '/productos', search: params.toString() });
  };
  const toggleCategory = (cat)=> updateParam('categoria', selectedCat === cat ? '' : cat);
  const toggleGender   = (g)=> { const next = gender===g ? '' : g; setGender(next); updateParam('genero', next); };
  const toggleSize     = (s)=> { const next = size===s ? '' : s;   setSize(next);   updateParam('talla', next);  };
  const toggleColor    = (c)=> { const next = color===c ? '' : c;  setColor(next);  updateParam('color', next); };

  const clearAll = ()=>{ setGender(''); setSize(''); setColor(''); nav('/productos'); };

  const filtered = useMemo(()=>{
    let items = [...PRODUCTS];
    if (selectedCat && CATS.includes(selectedCat)) items = items.filter(p => p.category === selectedCat);
    if (gender) items = items.filter(p => p.genders.includes(gender));
    if (size)   items = items.filter(p => p.sizes.includes(size.toUpperCase()));
    if (color)  items = items.filter(p => p.colors.includes(color));
    switch (sortBy) {
      case 'mayor': items.sort((a,b)=> b.price - a.price); break;
      case 'menor': items.sort((a,b)=> a.price - b.price); break;
      case 'destacados': items = items.slice().reverse(); break;
      default: break;
    }
    return items;
  }, [sortBy, selectedCat, gender, size, color]);

  return (
    <div className="products-page">
      <div className="products-hero" aria-hidden="true"></div>

      <section className="products-wrap">
        <div className="products-titlebar">
          <h1>Nuestros Productos</h1>
          <div className="sort-row">
            <label className="visually-hidden" htmlFor="orden">Ordenar producto</label>
            <select id="orden" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
              <option value="reciente">Más reciente</option>
              <option value="mayor">De mayor a menor</option>
              <option value="menor">De menor a mayor</option>
              <option value="destacados">Destacados</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          <aside className="filters" id="filtros">
            <div className="filters-head">
              <h3>Filtros</h3>
              <svg className="flat-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M3 6h18M6 12h12M9 18h6" stroke="#112135" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>

            <button className="clear-btn" onClick={clearAll}>Limpiar filtros</button>

            <div className="filter-block">
              <button className="filter-title" onClick={()=>setOpen(o=>({...o,cat:!o.cat}))}>
                Categoría <span className="plus">{open.cat ? '−' : '+'}</span>
              </button>
              <div className={`collapse ${open.cat ? 'is-open' : ''}`}>
                <ul className="filter-list">
                  {CATS.map(cat => (
                    <li key={cat}>
                      <button className={selectedCat === cat ? 'link active' : 'link'} onClick={()=>toggleCategory(cat)}>
                        {cat.charAt(0).toUpperCase()+cat.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr/>

            <div className="filter-block">
              <button className="filter-title" onClick={()=>setOpen(o=>({...o,gen:!o.gen}))}>
                Género <span className="plus">{open.gen ? '−' : '+'}</span>
              </button>
              <div className={`collapse ${open.gen ? 'is-open' : ''}`}>
                <ul className="filter-list">
                  {ALL_GENDERS.map(g => (
                    <li key={g}>
                      <button className={gender === g ? 'link active' : 'link'} onClick={()=>toggleGender(g)}>
                        {g.charAt(0).toUpperCase()+g.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr/>

            <div className="filter-block">
              <button className="filter-title" onClick={()=>setOpen(o=>({...o,size:!o.size}))}>
                Tallas <span className="plus">{open.size ? '−' : '+'}</span>
              </button>
              <div className={`collapse ${open.size ? 'is-open' : ''}`}>
                <ul className="filter-list sizes">
                  {ALL_SIZES.map(s => (
                    <li key={s}>
                      <button className={size === s ? 'chip active' : 'chip'} onClick={()=>toggleSize(s)}>{s}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr/>

            <div className="filter-block">
              <button className="filter-title" onClick={()=>setOpen(o=>({...o,color:!o.color}))}>
                Colores <span className="plus">{open.color ? '−' : '+'}</span>
              </button>
              <div className={`collapse ${open.color ? 'is-open' : ''}`}>
                <div className="colors">
                  {ALL_COLORS.map((c,i)=>(
                    <button key={i} className={color === c ? 'dot active' : 'dot'} style={{'--clr': c}} title={c} onClick={()=>toggleColor(c)} />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="cards-grid">
            {filtered.map(p => (
              <article className="card hover-card" key={p.id}>
                <img src={p.img} alt={p.name} />
                <div className="card-foot">
                  <span className="btn-fake">{formatPrice(p.price)}</span>
                  <Link to={`/productos/${p.id}`} className="btn-real">Ver Producto</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
