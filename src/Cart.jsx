import React, { useState } from 'react';
import './Cart.css';

/**
 * CHILD COMPONENT: Cart
 * 
 * QUESTION 4 & 5: How state helps in updating UI dynamically
 * 
 * This component demonstrates:
 * 1. Receiving cart data via PROPS (cartItems)
 * 2. Displaying data that changes dynamically based on parent's STATE
 * 3. When parent's cart state changes, this component automatically re-renders
 * 
 * WHAT HAPPENS WHEN STATE CHANGES:
 * 1. User clicks "Add to Cart" in ProductCard
 * 2. ProductCard calls onAddToCart() (parent function)
 * 3. Parent (App) updates cart STATE using setCart()
 * 4. React detects state change
 * 5. React re-renders App component and all its children
 * 6. This Cart component receives updated cartItems prop
 * 7. UI updates automatically to show new cart contents
 */
function Cart({ cartItems, onRemove, onUpdateQuantity, onClose }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Calculate total price from cart items (derived from props)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill in all address fields!');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    if (paymentMethod === 'upi' && !formData.upiId) {
      alert('Please enter your UPI ID!');
      return;
    }

    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv)) {
      alert('Please fill in all card details!');
      return;
    }

    setOrderConfirmed(true);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>🛒 Shopping Cart</h2>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      {orderConfirmed ? (
        <div className="order-confirmed">
          <div className="success-icon">✅</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase, {formData.name}!</p>
          <div className="order-details">
            <h3>Order Summary</h3>
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p><strong>Total Amount:</strong> ₹{totalPrice.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> {paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
            <h3>Delivery Address</h3>
            <p>{formData.name}</p>
            <p>{formData.address}</p>
            <p>{formData.city}, {formData.pincode}</p>
            <p>Phone: {formData.phone}</p>
          </div>
          <button className="checkout-btn" onClick={onClose}>Close</button>
        </div>
      ) : showCheckout ? (
        <div className="checkout-container">
          <button className="back-btn" onClick={() => setShowCheckout(false)}>← Back to Cart</button>
          
          <h3>Delivery Address</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />
          </div>

          <h3>Payment Method</h3>
          <div className="payment-methods">
            <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-icon">📱</span>
              <span>UPI</span>
            </label>

            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-icon">💳</span>
              <span>Credit/Debit Card</span>
            </label>

            <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-icon">💵</span>
              <span>Cash on Delivery</span>
            </label>
          </div>

          {paymentMethod === 'upi' && (
            <div className="payment-details">
              <h4>UPI Details</h4>
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID (e.g., name@upi)"
                value={formData.upiId}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="payment-details">
              <h4>Card Details</h4>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="16"
                required
              />
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
              <div className="card-row">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="payment-details">
              <p className="cod-info">💵 Pay cash when your order is delivered to your doorstep.</p>
            </div>
          )}

          <div className="checkout-summary">
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">{item.image}</div>
                
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price} each</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="item-subtotal">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <button
                    onClick={() => onRemove(item.id)}
                    className="remove-btn"
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row total">
              <span>Total Price:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
              Proceed to Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
