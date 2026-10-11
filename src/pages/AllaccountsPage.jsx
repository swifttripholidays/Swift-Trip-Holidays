import React, { useEffect } from 'react';

const pageScripts = [];
const inlineScripts = [];
const pageTitle = "Connect With SwiftTrip Holidays";

const pageSchemas = [];
const pageMeta = [{"tag": "meta", "name": "viewport", "content": "width=device-width, initial-scale=1.0"}];
export default function AllaccountsPage() {
  useEffect(() => {
    document.title = pageTitle;
    const added = [];
    const headNodes = [];
    for (const meta of pageMeta) {
      if (meta.tag === 'meta' && meta.name === 'viewport') continue;
      const node = document.createElement(meta.tag);
      for (const [key, value] of Object.entries(meta)) {
        if (key === 'tag') continue;
        node.setAttribute(key, Array.isArray(value) ? value.join(' ') : String(value));
      }
      node.dataset.reactPageMeta = 'true';
      document.head.appendChild(node);
      headNodes.push(node);
    }
    for (const schema of pageSchemas) {
      const node = document.createElement('script');
      node.type = 'application/ld+json';
      node.textContent = schema;
      node.dataset.reactPageSchema = 'true';
      document.head.appendChild(node);
      headNodes.push(node);
    }
    let cancelled = false;
    (async () => {
      for (const raw of pageScripts) {
        if (cancelled) return;
        const url = /^(https?:)?\/\//.test(raw) ? raw : (raw.startsWith('/') ? raw : '/' + raw.replace(/^\.\//, ''));
        const script = document.createElement('script');
        script.src = url; script.async = false;
        await new Promise(resolve => { script.onload = resolve; script.onerror = resolve; document.body.appendChild(script); added.push(script); });
      }
      if (cancelled) return;
      for (const code of inlineScripts) {
        const script = document.createElement('script'); script.textContent = code;
        document.body.appendChild(script); added.push(script);
      }
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
      window.dispatchEvent(new Event('load'));
    })();
    return () => { cancelled = true; added.forEach(script => script.remove()); headNodes.forEach(node => node.remove()); };
  }, []);
  return <div className="page page--allaccounts">
    <section className="contact-social" id="connect"><div className="contact-social__container"><article className="contact-card"><header className="contact-card__header"><div className="contact-card__logo"><img src="/assets/images/logo.png" alt="SwiftTrip Holidays" /></div><p className="contact-card__eyebrow">Get In Touch</p><h2 className="contact-card__title">Connect With Swift<span>Trip</span> Holidays</h2><p className="contact-card__desc">          Stay connected with us through our official platforms — we're only one message away.        </p></header><ul className="contact-list"><li className="contact-row"><a className="contact-row__link" href="https://www.instagram.com/swifttripholidays?igsh=ZTIyMGJxOW83djdn" target="_blank" rel="noopener noreferrer" aria-label="Follow SwiftTrip Holidays on Instagram"><span className="contact-row__icon contact-row__icon--instagram" aria-hidden="true"><i className="fa-brands fa-instagram"></i></span><span className="contact-row__text"><span className="contact-row__platform">Instagram</span><span className="contact-row__meta">Follow us for travel inspiration</span></span><span className="contact-row__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span></a></li><li className="contact-row"><a className="contact-row__link" href="https://www.facebook.com/share/1CtA4mFDJR/" target="_blank" rel="noopener noreferrer" aria-label="Like SwiftTrip Holidays on Facebook"><span className="contact-row__icon contact-row__icon--facebook" aria-hidden="true"><i className="fa-brands fa-facebook-f"></i></span><span className="contact-row__text"><span className="contact-row__platform">Facebook</span><span className="contact-row__meta">Like our page for updates & offers</span></span><span className="contact-row__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span></a></li><li className="contact-row"><a className="contact-row__link" href="https://www.linkedin.com/company/swift-trip-holidays/" target="_blank" rel="noopener noreferrer" aria-label="Connect with SwiftTrip Holidays on LinkedIn"><span className="contact-row__icon contact-row__icon--linkedin" aria-hidden="true"><i className="fa-brands fa-linkedin-in"></i></span><span className="contact-row__text"><span className="contact-row__platform">LinkedIn</span><span className="contact-row__meta">Connect with us professionally</span></span><span className="contact-row__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span></a></li><li className="contact-row"><a className="contact-row__link" href="mailto:info@swifttripholidays.co.uk" aria-label="Email SwiftTrip Holidays"><span className="contact-row__icon contact-row__icon--email" aria-hidden="true"><i className="fa-solid fa-envelope"></i></span><span className="contact-row__text"><span className="contact-row__platform">Email</span><span className="contact-row__meta">info@swifttripholidays.co.uk</span></span><span className="contact-row__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span></a></li><li className="contact-row"><a className="contact-row__link" href="tel:+447349856977" aria-label="Call SwiftTrip Holidays"><span className="contact-row__icon contact-row__icon--phone" aria-hidden="true"><i className="fa-solid fa-phone"></i></span><span className="contact-row__text"><span className="contact-row__platform">Phone</span><span className="contact-row__meta">+44 7349856977</span></span><span className="contact-row__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span></a></li><li className="contact-row"><a className="contact-row__link" href="https://wa.me/447349856977" target="_blank" rel="noopener noreferrer" aria-label="Chat with SwiftTrip Holidays on WhatsApp"><span className="contact-row__icon contact-row__icon--whatsapp" aria-hidden="true"><i className="fa-brands fa-whatsapp"></i></span><span className="contact-row__text"><span className="contact-row__platform">WhatsApp</span><span className="contact-row__meta">Chat with us instantly</span></span><span className="contact-row__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span></a></li></ul></article></div></section>
  </div>;
}
