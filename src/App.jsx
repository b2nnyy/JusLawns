import { useState } from 'react';
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

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <LoginGate>
      <HashRouter>
        <ScrollToTop />
        <Navbar openModal={() => setModalOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home openModal={() => setModalOpen(true)} />} />
            <Route
              path="/services-pricing"
              element={<ServicesPricing openModal={() => setModalOpen(true)} />}
            />
            <Route
              path="/service-area"
              element={<ServiceAreaPage openModal={() => setModalOpen(true)} />}
            />
            <Route
              path="/contact-quote"
              element={<ContactQuote openModal={() => setModalOpen(true)} />}
            />
          </Routes>
        </main>
        <Footer />
        <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </HashRouter>
    </LoginGate>
  );
}

export default App;
