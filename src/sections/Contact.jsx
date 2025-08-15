import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'JavaScript Mastery',
          from_email: form.email,
          to_email: 'sujata@jsmastery.pro',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Merci pour votre message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "Je n'ai pas reçu votre message 😢",
            type: 'danger',
          });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
  <img src="/Bydev-portfolio/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

        <div className="contact-container">
          <h3 className="head-text"><br />Contactez-moi</h3>
          <p className="text-lg text-white-600 mt-3">
            Privilégiez le contact par Discord, voici mon nom d'utilisateur : <b>.bydev</b><br /><br />

            Envoyez moi un message si vous souhaitez discuter d'un projet, d'une collaboration ou si vous avez des questions. Je suis là pour vous aider !
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Nom ou pseudo</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., bydev"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Adresse mail</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., bydevfr@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Votre message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4.5}
                className="field-input"
                placeholder="Partagez votre projet ou vos questions..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Envoie...' : 'Envoyer le mail'}

              <img src="/Bydev-portfolio/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;



