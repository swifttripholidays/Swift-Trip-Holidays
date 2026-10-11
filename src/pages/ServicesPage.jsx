import React, { useEffect, useState } from 'react';

const services = [
  { icon: '✈️', eyebrow: 'TRAVEL WITH CONFIDENCE', title: 'Schengen Visa Guidance', description: 'Personalised guidance for choosing the right application route and preparing for your trip.' },
  { icon: '📋', eyebrow: 'GET DOCUMENT-READY', title: 'Document Review', description: 'A clear checklist and review of supporting documents before you submit your application.' },
  { icon: '📅', eyebrow: 'KNOW YOUR NEXT STEP', title: 'Appointment Assistance', description: 'Guidance for navigating official visa application centre appointment systems.' },
  { icon: '🧭', eyebrow: 'MAKE A GREAT PLAN', title: 'Travel Planning', description: 'Practical help organising destinations, timing, and travel plans for your European holiday.' },
  { icon: '💬', eyebrow: 'LET’S TALK IT THROUGH', title: 'Free Consultation', description: 'Discuss your plans with our team and understand the next steps before you begin.' },
  { icon: '👨‍👩‍👧', eyebrow: 'PLAN TOGETHER', title: 'Family Travel Support', description: 'Help planning applications and travel details for families travelling together.' },
];

const navLinks = [
  ['Home', '/index.html'],
  ['About', '/about.html'],
  ['Services', '/services.html'],
  ['Countries', '/countries.html'],
  ['Success Stories', '/success-stories.html'],
  ['Contact', '/contact.html'],
];

function ServicesHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.classList.toggle('services-menu-open', menuOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('services-menu-open');
    };
  }, [menuOpen]);

  return <>
    <div className="top-bar services-top-bar">
      <div className="top-bar-content">
        <div className="offer-left"><i className="fa-solid fa-snowflake" aria-hidden="true"></i><span>Plan your next European journey with confidence</span></div>
        <a className="offer-btn" href="/contact.html#contact-form"><span>Free Consultation</span><i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
    <nav className={`navbar services-navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <div className="navbar-inner">
        <a href="/index.html" className="nav-logo" aria-label="Swift Trip Holidays home"><img src="/assets/images/logo.jpeg" alt="Swift Trip Holidays" width="166" height="48" /></a>
        <ul className="nav-links" role="list">
          {navLinks.map(([label, href]) => <li key={href}><a className={label === 'Services' ? 'active' : undefined} href={href} aria-current={label === 'Services' ? 'page' : undefined}>{label}</a></li>)}
        </ul>
        <div className="nav-actions">
          <a href="/contact.html#contact-form" className="btn-apply desktop">Book a free chat <i className="fas fa-arrow-right" aria-hidden="true"></i></a>
          <button className={`hamburger${menuOpen ? ' active' : ''}`} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
      {navLinks.map(([label, href]) => <a key={href} href={href} aria-current={label === 'Services' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a href="/contact.html#contact-form" className="btn-apply" onClick={() => setMenuOpen(false)}>Book a free consultation <span aria-hidden="true">→</span></a>
    </nav>
    <button className={`nav-overlay${menuOpen ? ' active' : ''}`} type="button" aria-label="Close navigation menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} />
  </>;
}

function ServicesFooter() {
  return <footer className="footer services-footer" role="contentinfo">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="/index.html" className="nav-logo"><img src="/assets/images/logo.jpeg" alt="Swift Trip Holidays" width="150" height="44" /></a>
          <p>Friendly, practical support for your Schengen visa preparation and European travel plans.</p>
          <div className="footer-socials"><a href="https://www.facebook.com/profile.php?id=61590253950597" aria-label="Facebook"><i className="fab fa-facebook-f" /></a><a href="https://www.instagram.com/swifttripholidays" aria-label="Instagram"><i className="fab fa-instagram" /></a><a href="https://wa.me/447349856977" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></a></div>
        </div>
        <div className="footer-col"><h4>Quick Links</h4><ul>{navLinks.map(([label, href]) => <li key={href}><a href={href}><i className="fas fa-chevron-right" aria-hidden="true" />{label}</a></li>)}</ul></div>
        <div className="footer-col"><h4>Our Support</h4><ul><li><a href="/services.html#visa-guidance">Visa guidance</a></li><li><a href="/services.html#document-review">Document review</a></li><li><a href="/services.html#travel-planning">Travel planning</a></li><li><a href="/contact.html#contact-form">Free consultation</a></li></ul></div>
        <div className="footer-col"><h4>Contact Us</h4><ul><li><a href="tel:+447349856977"><i className="fas fa-phone" aria-hidden="true" />+44 7349 856977</a></li><li><a href="mailto:info@swifttripholidays.co.uk"><i className="fas fa-envelope" aria-hidden="true" />info@swifttripholidays.co.uk</a></li><li><a href="https://wa.me/447349856977"><i className="fab fa-whatsapp" aria-hidden="true" />WhatsApp us</a></li></ul></div>
      </div>
      <div className="footer-bottom"><p>© 2026 <span>Swift Trip Holidays</span>. All rights reserved.</p><div className="footer-bottom-links"><a href="/terms.html">Terms of Service</a><a href="/sitemap.xml">Sitemap</a></div></div>
    </div>
  </footer>;
}

export default function ServicesPage() {
  useEffect(() => { document.title = 'Our Services | Swift Trip Holidays'; }, []);

  return <div className="page page--services services-page">
    <ServicesHeader />
    <main>
      <section className="services-hero" aria-labelledby="services-hero-title">
        <div className="services-hero-orb services-hero-orb-one" aria-hidden="true" />
        <div className="services-hero-orb services-hero-orb-two" aria-hidden="true" />
        <div className="services-hero-inner">
          <div className="services-hero-copy">
            <span className="section-label"><i className="fa-solid fa-sparkles" aria-hidden="true" /> HOW WE HELP</span>
            <h1 id="services-hero-title">Travel planning, <span>made simpler.</span></h1>
            <p>From your first questions to a more organised application, Swift Trip Holidays helps you prepare for your European journey with confidence.</p>
            <div className="services-hero-actions"><a className="btn-primary" href="/contact.html#contact-form">Book a free consultation <span aria-hidden="true">→</span></a><a className="services-secondary-button" href="#our-services">Explore our services <span aria-hidden="true">↓</span></a></div>
            <div className="services-hero-trust"><span><i className="fas fa-check-circle" aria-hidden="true" /> Personal guidance</span><span><i className="fas fa-check-circle" aria-hidden="true" /> Clear next steps</span><span><i className="fas fa-check-circle" aria-hidden="true" /> No-cost first chat</span></div>
          </div>
          <div className="services-hero-visual" aria-hidden="true">
            <div className="services-hero-image-frame"><img src="/assets/images/services.jpeg" alt="" fetchPriority="high" /></div>
            <div className="services-floating-note services-floating-note-top"><span>✦</span><div><strong>Travel, made easier</strong><small>One step at a time</small></div></div>
            <div className="services-floating-note services-floating-note-bottom"><span className="services-note-icon">✓</span><div><strong>Friendly support</strong><small>Here when you need us</small></div></div>
            <span className="services-hero-stamp">YOUR NEXT<br />ADVENTURE<br /><b>STARTS HERE</b></span>
          </div>
        </div>
        <div className="services-hero-bottom"><span>PERSONAL GUIDANCE</span><i></i><span>PRACTICAL SUPPORT</span><i></i><span>TRAVEL WITH CONFIDENCE</span></div>
      </section>

      <section className="services-list-section" id="our-services" aria-labelledby="services-list-title">
        <div className="container">
          <div className="section-header services-section-header">
            <div className="section-label">OUR SERVICES</div>
            <h2 className="section-title" id="services-list-title">Support for your <span>next journey</span></h2>
            <p className="section-desc">Clear guidance, practical preparation and personal support at every step.</p>
          </div>
          <div className="services-card-grid">
            {services.map((service, index) => <article className="services-card" id={['visa-guidance','document-review','appointment-assistance','travel-planning','free-consultation','family-travel-support'][index]} key={service.title} style={{ '--card-index': index }}>
              <div className="services-card-topline"><span className="services-card-icon" aria-hidden="true">{service.icon}</span><span className="services-card-number">0{index + 1}</span></div>
              <span className="services-card-eyebrow">{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="/contact.html#contact-form">Discuss this service <span aria-hidden="true">↗</span></a>
            </article>)}
          </div>
          <p className="services-disclaimer">Visa decisions and appointment availability are determined by the relevant authorities and application centres. We provide guidance and do not guarantee visa approval.</p>
        </div>
      </section>

      <section className="services-cta" aria-labelledby="services-cta-title">
        <div className="services-cta-decoration services-cta-decoration-one" aria-hidden="true" />
        <div className="services-cta-decoration services-cta-decoration-two" aria-hidden="true" />
        <div className="services-cta-content"><span className="services-cta-label">YOUR NEXT STEP</span><h2 id="services-cta-title">Not sure where to start?</h2><p>Book a free consultation and tell us about your travel plans.</p><a className="services-cta-link" href="/contact.html#contact-form">Get my free consultation <span aria-hidden="true">→</span></a><small>No pressure. Just clear, friendly guidance.</small></div>
      </section>
    </main>
    <ServicesFooter />
  </div>;
}
