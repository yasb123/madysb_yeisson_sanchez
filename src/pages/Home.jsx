import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home(){
  return (
    <div className="home">
      <section className="hero hero--with-image">
        <div className="hero-overlay">
          <h1>Creado para<br/>tu crecimiento<br/>profesional</h1>
          <Link to="/productos" className="cta">Compra Ahora</Link>
        </div>
      </section>

      <section className="benefits">
        <div className="benefit">
          <div className="circle hoverable">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
              7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 
              0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
            </svg>
          </div>
          <p>Diseños Personalizados</p>
        </div>
        <div className="benefit">
          <div className="circle hoverable">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 
              2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <p>Confección de calidad</p>
        </div>
        <div className="benefit">
          <div className="circle hoverable">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
              <path d="M3 13h1V6h11v7h2l3 3v2h-2a2 2 0 1 1-4 0H9a2 2 0 1 
              1-4 0H3v-5zm14 5a1 1 0 1 0 2 0 1 1 0 0 0-2 0zM7 19a1 1 0 1 0 
              -2 0 1 1 0 0 0 2 0z"/>
            </svg>
          </div>
          <p>Entregas a tiempo</p>
        </div>
      </section>

      <section className="categories">
        <h2>Categorías</h2>
        <div className="cards">
          {[
            {label:'Camisas', filter:'camisas'},
            {label:'Pantalones', filter:'pantalones'},
            {label:'Uniformes', filter:'uniformes'},
            {label:'Chaquetas', filter:'chaquetas'},
          ].map(c => (
            <div className="card hover-card" key={c.label}>
              <img src={`https://placehold.co/260x180?text=${encodeURIComponent(c.label)}`} alt={c.label} />
              <div className="card-foot">
                <span className="btn-fake">{c.label}</span>
                <Link to={`/productos?categoria=${c.filter}#filtros`} className="btn-real">Ver Producto</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="difference">
        <h2>Hacemos la Diferencia</h2>
        <div className="diff-grid">
          <ul className="bullets">
            <li>Calidad garantizada</li>
            <li>Confección a tu medida</li>
            <li>Textiles a tu medida</li>
            <li>Atención especializada</li>
            <li>Entregas puerta a puerta</li>
          </ul>
          <div className="diff-image">
            <img src="https://placehold.co/480x300?text=Imagen%20480x300" alt="Diferenciales MADY'SB"/>
          </div>
        </div>
      </section>

      <section className="map">
        <h2>Encuéntranos aquí</h2>
        <div className="map-frame">
          <iframe title="Ubicación MADY'SB" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent('Cra 62 # 2A - 68, Bogotá, Colombia')}&output=embed`}>
          </iframe>
        </div>
      </section>
    </div>
  )
}
