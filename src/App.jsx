import { useState, useCallback } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginGate from './components/LoginGate';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ServicesPricing from './pages/ServicesPricing';
import ServiceAreaPage from './pages/ServiceAreaPage';
import ContactQuote from './pages/ContactQuote';
import BookService from './pages/BookService';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  const [modal, setModal] = useState({ open: false, service: '' });

  const openModal = useCallback((service = '') => {
    setModal({ open: true, service });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, service: '' });
  }, []);

  return (
    <LoginGate>
      <HashRouter>
        <ScrollToTop />
        <Navbar openModal={openModal} />
        <main>
          <Routes>
            <Route path="/" element={<Home openModal={openModal} />} />
            <Route
              path="/services-pricing"
              element={<ServicesPricing openModal={openModal} />}
            />
            <Route
              path="/service-area"
              element={<ServiceAreaPage openModal={openModal} />}
            />
            <Route
              path="/contact-quote"
              element={<ContactQuote openModal={openModal} />}
            />
            <Route path="/book" element={<BookService />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
        <QuoteModal
          isOpen={modal.open}
          preselectedService={modal.service}
          onClose={closeModal}
        />
      </HashRouter>
    </LoginGate>
  );
}

export default App;
