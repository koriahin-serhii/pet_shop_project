import React from 'react'
import { useDispatch } from 'react-redux'
import { Counter } from '../../ui'
import { getImageUrl } from '../../utils/api'
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
      {/* Изображение товара */}
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(image)}
          alt={title}
          className={styles.productImage}
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/150x120/F5F5F5/999999?text=No+Image'
          }}
        />
      </div>

      {/* Информация о товаре */}
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>

        {/* Счетчик количества */}
        <div className={styles.counterContainer}>
          <Counter
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={99}
            className={styles.counter}
          />
          {/* Цена */}
          <div className={styles.priceContainer}>
            <div className={styles.currentPrice}>${currentPrice}</div>
            {hasDiscount && (
              <div className={styles.originalPrice}>${price}</div>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка удаления */}
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
