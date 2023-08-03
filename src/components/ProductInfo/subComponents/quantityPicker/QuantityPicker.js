import React, { useState } from 'react';
import './QuantityPicker.css';

const QuantityPicker = ({ min, max, initialValue, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleQuantityChange = (value) => {
    if (value >= min && value <= max) {
      setQuantity(value);
      if (onQuantityChange) {
        onQuantityChange(value);
      }
    }
  };

  const decreaseQuantity = () => {
    handleQuantityChange(quantity - 1);
  };

  const increaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  return (
    <div className="quantity-picker">
      <button className="quantity-picker__button" onClick={decreaseQuantity} disabled={quantity <= min}>
        -
      </button>
      <span className="quantity-picker__value">{quantity}</span>
      <button className="quantity-picker__button" onClick={increaseQuantity} disabled={quantity >= max}>
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
