import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Cart from './Cart';
import './App.css';

function App() {
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: 6499, description: 'High-quality wireless headphones with noise cancellation', image: '🎧', stock: 15, category: 'Audio', rating: 4.5 },
    { id: 2, name: 'Smart Watch', price: 16499, description: 'Fitness tracking smart watch with heart rate monitor', image: '⌚', stock: 8, category: 'Wearables', rating: 4.8 },
    { id: 3, name: 'Laptop Backpack', price: 3999, description: 'Durable backpack with padded laptop compartment', image: '🎒', stock: 20, category: 'Accessories', rating: 4.3 },
    { id: 4, name: 'USB-C Cable', price: 999, description: 'Fast charging USB-C cable, 6ft long', image: '🔌', stock: 50, category: 'Accessories', rating: 4.2 },
    { id: 5, name: 'Mechanical Keyboard', price: 10499, description: 'RGB mechanical gaming keyboard with custom switches', image: '⌨️', stock: 12, category: 'Peripherals', rating: 4.7 },
    { id: 6, name: 'Wireless Mouse', price: 3199, description: 'Ergonomic wireless mouse with precision tracking', image: '🖱️', stock: 25, category: 'Peripherals', rating: 4.4 },
    { id: 7, name: 'Portable SSD', price: 7299, description: '1TB portable SSD with USB 3.2 Gen 2 support', image: '💾', stock: 18, category: 'Storage', rating: 4.6 },
    { id: 8, name: 'Bluetooth Speaker', price: 4899, description: 'Waterproof bluetooth speaker with 12-hour battery', image: '🔊', stock: 22, category: 'Audio', rating: 4.5 },
    { id: 9, name: 'Webcam HD', price: 5699, description: '1080p HD webcam with built-in microphone', image: '📷', stock: 14, category: 'Peripherals', rating: 4.3 },
    { id: 10, name: 'Phone Stand', price: 1599, description: 'Adjustable phone stand with cable management', image: '📱', stock: 35, category: 'Accessories', rating: 4.1 },
    { id: 11, name: 'Gaming Headset', price: 12299, description: '7.1 surround sound gaming headset with RGB lighting', image: '🎮', stock: 10, category: 'Audio', rating: 4.7 },
    { id: 12, name: 'Monitor Stand', price: 2799, description: 'Ergonomic monitor stand with storage drawer', image: '🖥️', stock: 16, category: 'Accessories', rating: 4.4 },
    { id: 13, name: 'Wireless Charger', price: 2399, description: 'Fast wireless charging pad for Qi-enabled devices', image: '⚡', stock: 28, category: 'Accessories', rating: 4.2 },
    { id: 14, name: 'Laptop Cooling Pad', price: 1999, description: 'Cooling pad with adjustable fans for laptops', image: '❄️', stock: 19, category: 'Accessories', rating: 4.0 },
    { id: 15, name: 'USB Hub', price: 2649, description: '7-port USB 3.0 hub with individual switches', image: '🔌', stock: 40, category: 'Accessories', rating: 4.3 }
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(product.name + ' added to cart!');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => prevFavorites.includes(productId) ? prevFavorites.filter(id => id !== productId) : [...prevFavorites, productId]);
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name':
      default: return a.name.localeCompare(b.name);
    }
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Online Shopping Store</h1>
        <div className="header-actions">
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
          <button onClick={() => setShowCart(!showCart)} className="cart-button">🛒 Cart ({totalItems})</button>
        </div>
      </header>

      {!showCart && (
        <div className="controls-bar">
          <div className="filter-section">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
              {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
            </select>

            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>

            <label>Max Price: ${maxPrice}</label>
            <input type="range" min="0" max="250" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="price-slider" />

            <button onClick={() => { setSelectedCategory('All'); setSortBy('name'); setSearchTerm(''); setMaxPrice(250); }} className="reset-btn">Reset Filters</button>
          </div>
        </div>
      )}

      <div className="main-content">
        {showCart ? (
          <Cart cartItems={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onClose={() => setShowCart(false)} />
        ) : (
          <div className="products-section">
            <h2>Available Products ({filteredProducts.length})</h2>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} isFavorite={favorites.includes(product.id)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
            {filteredProducts.length === 0 && (<p className="no-products">No products found matching your criteria</p>)}
          </div>
        )}
      </div>

      <div className="explanation">
        <h3></h3>
        <ul>
          <li><strong>Thank You for Shopping with Us!</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
