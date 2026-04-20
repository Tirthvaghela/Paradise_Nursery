import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf } from 'lucide-react';

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(250,249,246,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(20,36,27,0.1)',
        padding: '1rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ background: '#14241B', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={18} color="#FAF9F6" />
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.25rem', color: '#14241B', letterSpacing: '-0.02em' }}>
            Paradise Nursery
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link
            to="/products"
            style={{
              fontFamily: 'sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#14241B',
              textDecoration: 'none',
              borderBottom: location.pathname === '/products' ? '2px solid #14241B' : '2px solid transparent',
              paddingBottom: '2px',
            }}
          >
            Catalog
          </Link>
          <Link
            to="/cart"
            style={{ position: 'relative', color: '#14241B', display: 'flex', alignItems: 'center' }}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#9C7E46',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
