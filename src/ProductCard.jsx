import React from 'react';
import './ProductCard.css';

/**
 * CHILD COMPONENT: ProductCard
 * 
 * QUESTION 2: Difference between PROPS and STATE
 * 
 * PROPS (Properties):
 * - Data passed FROM parent TO child component
 * - READ-ONLY: Child cannot modify props
 * - Used to configure child components
 * - Props flow DOWN the component tree (unidirectional data flow)
 * - Example: product, onAddToCart
 * 
 * STATE:
 * - Data managed WITHIN a component
 * - MUTABLE: Component can update its own state using setState
 * - Used for data that changes over time
 * - When state changes, component re-renders
 * - Example: This component could have state for "isHovered" or "selectedSize"
 * 
 * This component receives PROPS from parent (App.jsx):
 * - product: object with product details
 * - onAddToCart: function to call when button is clicked
 */
function ProductCard({ product, onAddToCart, isFavorite, onToggleFavorite }) {
  // This component could have its own STATE for UI interactions
  // Example: const [isHovered, setIsHovered] = useState(false);
  
  /**
   * QUESTION 3: Passing data from parent to child using props
   * 
   * The parent (App) passes data like this:
   *   <ProductCard product={productData} onAddToCart={addToCartFunction} />
   * 
   * The child (this component) receives it via function parameters:
   *   function ProductCard({ product, onAddToCart }) { ... }
   * 
   * Now we can access:
   * - product.name, product.price, product.description, etc.
   * - onAddToCart() function to communicate back to parent
   */

  const handleAddToCart = () => {
    // Call the parent's function (passed via props)
    // This is how children communicate with parents: through callback functions
    onAddToCart(product);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(product.id);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">⭐</span>);
    }
    return stars;
  };

  return (
    <div className="product-card">
      <button 
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={handleToggleFavorite}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className="product-image">
        {product.image}
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-category">{product.category}</span>
        </div>

        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="rating-text">({product.rating})</span>
        </div>

        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <div className="price-stock">
            <span className="product-price">₹{product.price}</span>
            <span className={`product-stock ${product.stock < 10 ? 'low' : ''}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* Props vs State Visualization */}
      <div className="component-info">
        <small>
          📦 Props: product, onAddToCart, isFavorite, onToggleFavorite
          <br />
          🔒 Props are read-only - cannot modify product.price here
        </small>
      </div>
    </div>
  );
}

/**
 * EXAMPLE: Component with its own STATE
 * 
 * Uncomment below to see a version with internal state management:
 */

/*
function ProductCardWithState({ product, onAddToCart }) {
  // This component has its own STATE
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddToCart = () => {
    // Use both PROPS (product) and STATE (quantity)
    onAddToCart(product, quantity);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      
      // STATE controls the quantity
      <input 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)}
      />
      
      // STATE controls expansion
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
      
      {isExpanded && <p>{product.description}</p>}
      
      <button onClick={handleAddToCart}>Add {quantity} to Cart</button>
    </div>
  );
}
*/

export default ProductCard;
