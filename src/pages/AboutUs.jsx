import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-hero" />

      <main className="about-container">
        <h1 className="about-title">Sobre Nosotros</h1>

        <section className="about-card">
          {/* Placeholder tipo bloque gris como en el diseño de referencia */}
          <div className="about-placeholder">
            <span className="about-placeholder-text">Imagen corporativa MADY&apos;SB</span>
          </div>

          <div className="about-text">
            <p>
              <strong>MADY&apos;SB</strong> es una empresa colombiana fundada en 2005,
              dedicada a la confección de uniformes y dotaciones industriales.
              A lo largo de los años, hemos trabajado con dedicación y compromiso,
              confeccionando prendas tanto para una sola persona como para grandes
              equipos empresariales.
            </p>

            <p>
              Nuestro modelo de producción bajo demanda (On Demand) nos permite
              optimizar recursos, reducir desperdicios y contribuir activamente al
              cuidado del medio ambiente. En <strong>MADY&apos;SB</strong> combinamos
              calidad, responsabilidad y diseño para ofrecer soluciones que se adaptan
              a las necesidades de cada cliente.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
