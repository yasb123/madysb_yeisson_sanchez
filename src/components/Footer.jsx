import './Footer.css'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="brand-row">
            <span className="logo-mark">A</span>
            <span className="brand-text">MADY’SB</span>
          </div>
          <p>Copyright © 2009-2025 MADY’SB S.A.</p>
          <p>Cel/Wsp +57 3202274616</p>
          <p><a href="mailto:infomadysb@gmail.com">infomadysb@gmail.com</a></p>
        </div>

        <div className="footer-divider" aria-hidden="true"></div>

        <div className="footer-right">
          <p className="right-title">Síguenos en nuestras redes y contacta con nosotros.</p>
          <div className="socials">
            <a className="dot" href="https://www.facebook.com/madysbco" target="_blank" rel="noreferrer" aria-label="Facebook"></a>
            <a className="dot" href="https://www.instagram.com/madysbco" target="_blank" rel="noreferrer" aria-label="Instagram"></a>
            <a className="dot" href="https://x.com/madysbco" target="_blank" rel="noreferrer" aria-label="X"></a>
            <a className="dot" href="https://co.pinterest.com/madysbco" target="_blank" rel="noreferrer" aria-label="Pinterest"></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Yeisson Arturo Sanchez Bautista - 2025</p>
        <p>Términos y condiciones / Política de privacidad</p>
      </div>
    </footer>
  )
}
