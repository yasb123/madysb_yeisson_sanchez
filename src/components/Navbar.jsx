import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [hasItems, setHasItems] = useState(false)
  React.useEffect(()=>{
    const check=()=>{ try{ const c=JSON.parse(localStorage.getItem('cart')||'[]'); setHasItems(Array.isArray(c)&&c.length>0);}catch{setHasItems(false);} };
    check();
    window.addEventListener('storage', check);
    return ()=> window.removeEventListener('storage', check);
  },[])
  return (
    <header className="nav-header">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="logo-mark">A</span>
          <span className="brand-text">MADY’SB</span>
        </Link>

        <button className="hamburger" aria-label="Abrir menú" onClick={()=>setOpen(!open)}>
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${open ? 'open':''}`}>
          <NavLink onClick={()=>setOpen(false)} to="/">Inicio</NavLink>
          <NavLink onClick={()=>setOpen(false)} to="/productos">Productos</NavLink>
          <NavLink onClick={()=>setOpen(false)} to="/nosotros">Nosotros</NavLink>
          <NavLink onClick={()=>setOpen(false)} to="/contacto">Contacto</NavLink>
          <Link onClick={()=>setOpen(false)} to="/carrito" className="cart-icon" aria-label="Carrito">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
              0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
              14h9.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.05 
              5H6.21L5.27 3H2v2h2l3.6 7.59-1.35 2.45C5.52 15.37 6 16 6.7 
              16H20v-2H7.42l.74-1.33z"/>
            </svg>
            {hasItems && <span className="cart-dot" aria-hidden="true" />}
          </Link>
        </nav>
      </div>
    </header>
  )
}
