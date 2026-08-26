import { contact, footerStatement, socials } from '../data/portfolio';
import './contact.scss';

export default function Contact() {
  return (
    <>
      <section id="contact" className="section" aria-label="Kontak">
        <span className="section-index mono" aria-hidden="true">07 / CONTACT</span>
        <div className="container contact-box">
          <p className="micro-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>GET IN TOUCH</p>
          <h2 style={{ marginTop: '1.6rem' }}>
            Let's build something <em>real</em>.
          </h2>
          <p>{contact.message}</p>

          <div className="contact-actions">
            <a className="btn btn-primary" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" data-magnetic>
              Chat WhatsApp <span aria-hidden="true">→</span>
            </a>
            <a className="btn" href={socials[0].href} target="_blank" rel="noopener noreferrer" data-magnetic>
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="wa-chip mono">
            <b>WA</b> {contact.whatsappDisplay}
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="stmt">
            MALIK FAJAR <i>◆</i> {footerStatement}
          </p>
          <p className="copy">© {new Date().getFullYear()} — PORTFOLIO V3</p>
        </div>
      </footer>
    </>
  );
}
