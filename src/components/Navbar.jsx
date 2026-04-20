import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf } from 'lucide-react';

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  const navLinkStyle = (path) => ({
    fontFamily: 'sans-serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#14241B',
    textDecoration: 'none',
    borderBottom: location.pathname === path ? '2px solid #14241B' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'opacity 0.2s',
  });

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(250,249,246,0.9)',
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
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.2rem', color: '#14241B', letterSpacing: '-0.02em' }}>
            Paradise Nursery
          </span>
        </Link>

        {/* Navigation Links — Home, Plants, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={navLinkStyle('/')}>
            Home
          </Link>
          <Link to="/products" style={navLinkStyle('/products')}>
            Plants
          </Link>
          <Link
            to="/cart"
            style={{ position: 'relative', color: '#14241B', display: 'flex', alignItems: 'center', gap: '0.3rem', ...navLinkStyle('/cart') }}
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                background: '#9C7E46',
                color: 'white',
                fontSize: '0.6rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
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
