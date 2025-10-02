import React from "react";

const QuantitySelector = ({ quantity, onChange }) => {
  const decrease = () => onChange(Math.max(1, quantity - 1));
  const increase = () => onChange(quantity + 1);
  const handleInput = (e) => onChange(Math.max(1, parseInt(e.target.value) || 1));

  return (
    <div className="quantity-container">
      <button type="button" className="quantity-btn" onClick={decrease}>
        −
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={handleInput}
        className="quantity-input"
      />
      <button type="button" className="quantity-btn" onClick={increase}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
