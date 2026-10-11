import React from 'react';
import { createRoot } from 'react-dom/client';
import IndexPage from './pages/IndexPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CountriesPage from './pages/CountriesPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SuccessStoriesPage from './pages/SuccessStoriesPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import ThankyouPage from './pages/ThankyouPage.jsx';
import AllaccountsPage from './pages/AllaccountsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GlobalChristmasEffects from './components/GlobalChristmasEffects.jsx';

const pages = {
  '/': IndexPage,
  '/index.html': IndexPage,
  '/services': ServicesPage,
  '/services.html': ServicesPage,
  '/about': AboutPage,
  '/about.html': AboutPage,
  '/contact': ContactPage,
  '/contact.html': ContactPage,
  '/countries': CountriesPage,
  '/countries.html': CountriesPage,
  '/register': RegisterPage,
  '/register.html': RegisterPage,
  '/success-stories': SuccessStoriesPage,
  '/success-stories.html': SuccessStoriesPage,
  '/terms': TermsPage,
  '/terms.html': TermsPage,
  '/thankyou': ThankyouPage,
  '/thankyou.html': ThankyouPage,
  '/links/allaccounts': AllaccountsPage,
  '/links/allaccounts.html': AllaccountsPage,
};

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const Page = pages[path];
  return (
    <>
      <GlobalChristmasEffects />
      {Page ? (
        <Page />
      ) : (
        <main className="migration-error">
          <h1>Page not found</h1>
          <p>This page isn't part of Swift Trip Holidays.</p>
          <a href="/">Return home</a>
        </main>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

