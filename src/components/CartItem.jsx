import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Leaf, ChevronLeft, X, Info } from 'lucide-react';

const FALLBACK = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showModal, setShowModal] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (id, qty) => dispatch(updateQuantity({ id, quantity: qty + 1 }));
  const handleDecrease = (id, qty) => {
    if (qty > 1) dispatch(updateQuantity({ id, quantity: qty - 1 }));
    else dispatch(removeItem(id));
  };

  return (
    <div className="cart-page">
      <div className="cart-container">

        {/* Page header */}
        <div className="cart-page-header">
          <div>
            <h2 className="cart-page-title">Your Greenhouse</h2>
            <p className="cart-page-subtitle">The items you have selected for your sanctuary.</p>
          </div>
          <Link to="/products" className="back-link">
            <ChevronLeft size={14} />
            Continue Browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <Leaf size={48} className="cart-empty-icon" />
            <p className="cart-empty-text">Your greenhouse is waiting for its first resident.</p>
            <Link to="/products" className="back-link" style={{ marginTop: '1.5rem' }}>
              <ChevronLeft size={14} />
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* Items column */}
            <div className="cart-items-col">
              {/* Summary strip */}
              <div className="cart-summary-strip">
                <span>{totalItems} {totalItems === 1 ? 'plant' : 'plants'} in your collection</span>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      onError={(e) => { e.target.src = FALLBACK; }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <div>
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-species">{item.species}</p>
                        <p className="cart-item-unit">Unit price: <strong>₹{item.price}</strong></p>
                      </div>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="delete-btn"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="qty-controls">
                        <button onClick={() => handleDecrease(item.id, item.quantity)} className="qty-btn" aria-label="Decrease">
                          <Minus size={13} />
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button onClick={() => handleIncrease(item.id, item.quantity)} className="qty-btn" aria-label="Increase">
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="cart-item-subtotal">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary sidebar */}
            <div className="cart-sidebar">
              <h4 className="sidebar-title">Acquisition Summary</h4>
              <div className="sidebar-lines">
                <div className="sidebar-line">
                  <span>Total Plants</span>
                  <span>{totalItems}</span>
                </div>
                <div className="sidebar-line">
                  <span>Subtotal</span>
                  <span>₹{totalCost}</span>
                </div>
                <div className="sidebar-line">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="sidebar-total">
                  <span>Total</span>
                  <span>₹{totalCost}</span>
                </div>
              </div>
              <button onClick={() => setShowModal(true)} className="checkout-btn">
                Checkout
              </button>
              <Link to="/products" className="continue-btn">
                <ChevronLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Checkout modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-accent-bar" />
            <div className="modal-icon-wrap">
              <Info size={28} color="#FAF9F6" />
            </div>
            <h3 className="modal-title">Coming Soon</h3>
            <p className="modal-text">
              Our gardeners are finalizing the logistics for secure botanical transportation.
              Check back shortly.
            </p>
            <button onClick={() => setShowModal(false)} className="modal-close-btn">
              Back to Greenhouse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
