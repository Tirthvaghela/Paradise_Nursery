import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function LandingPage() {
  return (
    <div className="landing">
      {/* Left panel — cream */}
      <div className="landing-left">
        <div className="landing-left-inner">
          <span className="landing-eyebrow">Since 2023</span>
          <h1 className="landing-headline">
            Paradise Nursery
          </h1>
          <h2 className="landing-subheadline">
            Live <em>Botanically.</em>
          </h2>
          <AboutUs />
          <Link to="/products" className="landing-cta">
            <span>Get Started</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right panel — botanical photo */}
      <div className="landing-right">
        <img
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1600"
          alt="Botanical seedlings"
          className="landing-photo"
        />
        {/* Fade edge blending left panel into photo */}
        <div className="landing-fade" />
      </div>
    </div>
  );
}

function App() {
  const basename = import.meta.env.BASE_URL; // /Paradise_Nursery/ in prod, / in dev

  return (
    <Provider store={store}>
      <Router basename={basename}>
        <Routes>
          {/* Landing — no navbar */}
          <Route path="/" element={<LandingPage />} />

          {/* Catalog */}
          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <ProductList />
              </>
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <CartItem />
              </>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
