import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getImageUrl } from '../../utils/api'
import { addToCart, selectCartItemById } from '../../redux/Slices/cartSlice'
import ButtonAdd from '../ButtonAdd/ButtonAdd'
import styles from './ProductCard.module.css'

const ProductCard = ({ 
  id, 
  title, 
  price, 
  discont_price, 
  image, 
  className,
  onClick 
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const isInCart = Boolean(cartItem)

  // Calculate discount percentage
  const calculateDiscountPercent = () => {
    if (!discont_price || !price) return null
    return Math.round((1 - discont_price / price) * 100)
  }

  const discountPercent = calculateDiscountPercent()
  
  // Handle image URL
  const getImageSrc = () => {
    if (!image) return 'https://via.placeholder.com/300x200/F5F5F5/999999?text=No+Image'
    if (image.startsWith('http')) return image // If already full URL
    return getImageUrl(image) // Otherwise use API utility
  }
  
  const imageUrl = getImageSrc()

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking button
    e.stopPropagation()
    
    if (!isInCart) {
      dispatch(addToCart({ 
        productId: id, 
        quantity: 1,
        productData: {
          id,
          title,
          price,
          discont_price,
          image
        }
      }))
    }
  }

  const cardContent = (
    <div className={`${styles.card} ${className || ''}`}>
      {/* Discount badge */}
      {discountPercent && (
        <div className={styles.discountBadge}>
          -{discountPercent}%
        </div>
      )}
      
      {/* Product image */}
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/F5F5F5/999999?text=No+Image'
          }}
        />
        {/* Add to cart button - appears on hover */}
        <div 
          className={styles.addToCartContainer}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <ButtonAdd
            onClick={handleAddToCart}
            isAdded={isInCart}
            className={styles.addToCartButton}
          />
        </div>
      </div>
      
      {/* Product information */}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        
        {/* Prices */}
        <div className={styles.priceContainer}>
          {discont_price ? (
            // Product with discount
            <>
              <span className={styles.discountPrice}>${discont_price}</span>
              <span className={styles.originalPrice}>${price}</span>
            </>
          ) : (
            // Regular product
            <span className={styles.price}>${price}</span>
          )}
        </div>
      </div>
    </div>
  )

  // If onClick is passed, render as clickable div
  if (onClick) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {cardContent}
      </div>
    )
  }

  // Otherwise render as Link
  return (
    <Link to={`/products/${id}`} className={styles.cardLink}>
      {cardContent}
    </Link>
  )
}

export default ProductCard