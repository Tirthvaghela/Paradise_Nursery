import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Leaf, ChevronLeft } from 'lucide-react';

const FALLBACK = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (id, qty) => dispatch(updateQuantity({ id, quantity: qty + 1 }));
  const handleDecrease = (id, qty) => {
    if (qty > 1) dispatch(updateQuantity({ id, quantity: qty - 1 }));
    else dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div className="cart-page">
      <div className="cart-container">

        {/* Page header */}
        <div className="cart-page-header">
          <div>
            <h2 className="cart-page-title">Your Shopping Cart</h2>
            <p className="cart-page-subtitle">
              Total Plants in Cart: <strong>{totalItems}</strong>
            </p>
          </div>
          <Link to="/products" className="back-link">
            <ChevronLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Total Cart Amount — prominently displayed */}
        <div className="cart-total-amount-banner">
          <span>Total Cart Amount:</span>
          <strong>₹{totalCost}</strong>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <Leaf size={48} className="cart-empty-icon" />
            <p className="cart-empty-text">Your cart is empty.</p>
            <Link to="/products" className="back-link" style={{ marginTop: '1.5rem' }}>
              <ChevronLeft size={14} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* Items column */}
            <div className="cart-items-col">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  {/* Thumbnail */}
                  <div className="cart-item-thumb">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      onError={(e) => { e.target.src = FALLBACK; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <div>
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-unit">Unit Price: <strong>₹{item.price}</strong></p>
                        <p className="cart-item-unit">
                          Total: <strong>₹{item.price * item.quantity}</strong>
                        </p>
                      </div>
                      {/* Delete button */}
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="delete-btn"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="cart-item-bottom">
                      <div className="qty-controls">
                        <button
                          onClick={() => handleDecrease(item.id, item.quantity)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id, item.quantity)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="cart-item-subtotal">
                        Subtotal: <strong>₹{item.price * item.quantity}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary sidebar */}
            <div className="cart-sidebar">
              <h4 className="sidebar-title">Order Summary</h4>
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
                  <span>Total Amount</span>
                  <span>₹{totalCost}</span>
                </div>
              </div>

              {/* Checkout button — shows alert "Coming Soon" */}
              <button onClick={handleCheckout} className="checkout-btn">
                Checkout
              </button>

              {/* Continue Shopping button */}
              <Link to="/products" className="continue-btn">
                <ChevronLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
