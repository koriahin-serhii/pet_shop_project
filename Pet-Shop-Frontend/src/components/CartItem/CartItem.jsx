import React from 'react'
import { useDispatch } from 'react-redux'
import { Counter } from '../../ui'
import { getImageUrl } from '../../utils/api'
import { getReliablePlaceholder } from '../../utils/placeholder'
import { updateQuantity, removeFromCart } from '../../redux/Slices/cartSlice'
import styles from './CartItem.module.css'

const CartItem = ({ item, className = '' }) => {
  const dispatch = useDispatch()
  
  if (!item || !item.productData) {
    return (
      <div className={styles.cartItem}>
        <div>No product data available</div>
      </div>
    )
  }

  const { productData, quantity, id } = item
  const { title, price, discont_price, image } = productData
  
  const hasDiscount = discont_price !== null && discont_price < price
  const currentPrice = hasDiscount ? discont_price : price

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className={`${styles.cartItem} ${className}`}>
      {/* Product image */}
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(image)}
          alt={title}
          className={styles.productImage}
          onError={(e) => {
            e.target.src = getReliablePlaceholder(150, 120, 'No Image')
          }}
        />
      </div>

      {/* Product information */}
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>

        {/* Quantity counter */}
        <div className={styles.counterContainer}>
          <Counter
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={99}
            className={styles.counter}
          />
          {/* Price */}
          <div className={styles.priceContainer}>
            <div className={styles.currentPrice}>${currentPrice}</div>
            {hasDiscount && (
              <div className={styles.originalPrice}>${price}</div>
            )}
          </div>
        </div>
      </div>

      {/* Remove button */}
      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label="Remove item from cart"
      >
        ×
      </button>
    </div>
  )
}

export default CartItem
