import React, { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="quantity-container">
        
      <button className="quantity-btn" onClick={decrease}>−</button>
      <input
        type="input"
        value={quantity}
        min="1"
        onChange={(e) =>
          setQuantity(Math.max(1, parseInt(e.target.value) || 1))
        }
        className="quantity-input"
      />
      <button className="quantity-btn" onClick={increase}>+</button>
    </div>
  );
};

export default QuantitySelector;
