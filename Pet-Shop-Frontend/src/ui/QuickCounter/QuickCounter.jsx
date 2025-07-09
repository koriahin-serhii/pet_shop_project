import React, { useState } from 'react'
import { Counter } from '../../ui'
import styles from './QuickCounter.module.css'

const QuickCounter = ({ 
  productId,
  onAddToCart,
  disabled = false,
  className = ''
}) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (onAddToCart && !disabled) {
      onAddToCart(productId, quantity)
      // Сбрасываем количество после добавления
      setQuantity(1)
    }
  }

  return (
    <div className={`${styles.quickCounter} ${className}`}>
      <Counter
        value={quantity}
        onChange={setQuantity}
        min={0}
        max={99}
        disabled={disabled}
      />
      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddToCart}
        disabled={disabled}
      >
        Add to cart
      </button>
    </div>
  )
}

export default QuickCounter
