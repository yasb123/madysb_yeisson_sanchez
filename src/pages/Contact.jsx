import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = form;

    if (!name.trim() || !phone.trim() || !message.trim()) return;

    // Construir correo usando mailto hacia infomadysb@gmail.com
    const subject = encodeURIComponent('Nuevo mensaje desde el formulario de contacto MADY\'SB');
    const body = encodeURIComponent(
      `Nombre y Apellido: ${name}\nCelular / WhatsApp: ${phone}\n\nMensaje:\n${message}`
    );

    const mailtoLink = `mailto:infomadysb@gmail.com?subject=${subject}&body=${body}`;

    // Abrir cliente de correo del usuario
    window.location.href = mailtoLink;

    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero" />

      <main className="contact-container">
        <h1 className="contact-title">Contáctanos</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-label">
            Nombre y Apellido
            <input
              type="text"
              name="name"
              className="contact-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-label">
            Celular/ WhatsApp
            <input
              type="tel"
              name="phone"
              className="contact-input"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-label">
            Tu comentario
            <textarea
              name="message"
              className="contact-textarea"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <div className="contact-submit-wrap">
            <button type="submit" className="btn primary">
              Enviar
            </button>
          </div>
        </form>

        {sent && (
          <p className="contact-info">
            Tu solicitud ha sido preparada para ser enviada a nuestro correo
            <strong> infomadysb@gmail.com</strong>. Por favor confirma el envío
            desde tu cliente de correo. La respuesta puede demorar dependiendo del
            tráfico de solicitudes, aunque usualmente es atendida en pocas horas o,
            como máximo, en un plazo de dos (2) días hábiles. Nuestro horario de
            atención es de lunes a viernes, de 7:00 a.m. a 5:00 p.m. Las solicitudes
            enviadas fuera de este horario serán gestionadas el siguiente día hábil.
          </p>
        )}
      </main>
    </div>
  );
};

export default Contact;
