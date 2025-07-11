import React, { useState } from 'react'
import { Counter, CustomButton } from '../../ui'
import { getImageUrl } from '../../utils/api'
import { getReliablePlaceholder } from '../../utils/placeholder'
import styles from './ProductDetails.module.css'

const ProductDetails = ({ 
  product,
  loading = false,
  error = null,
  onAddToCart
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [quantity, setQuantity] = useState(1)

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading product details...
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error}
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.error}>
        Product not found
      </div>
    )
  }

  const hasDiscount = product.discont_price !== null && product.discont_price < product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : 0

  const currentPrice = hasDiscount ? product.discont_price : product.price
  const description = product.description || ''
  const isLongDescription = description.length > 300
  const displayDescription = showFullDescription || !isLongDescription 
    ? description 
    : description.substring(0, 300) + '...'

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity)
    }
  }

  return (
    <div className={styles.productDetails}>
      {/* Product image */}
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          className={styles.productImage}
          onError={(e) => {
            e.target.src = getReliablePlaceholder(400, 400, 'No Image')
          }}
        />
      </div>

      {/* Product details */}
      <div className={styles.detailsContainer}>
        <h1 className={styles.productTitle}>{product.title}</h1>

        {/* Prices and discount */}
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>${currentPrice}</span>
          {hasDiscount && (
            <>
              <span className={styles.originalPrice}>${product.price}</span>
              <span className={styles.discountBadge}>-{discountPercentage}%</span>
            </>
          )}
        </div>

        {/* Counter and add to cart */}
        <div className={styles.counterSection}>
          <Counter
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={99}
          />
          <CustomButton
            onClick={handleAddToCart}
            fullWidth={true}
            className={styles.addToCartButton}
          >
            Add to cart
          </CustomButton>
        </div>

        {/* Description */}
        {description && (
          <div className={styles.descriptionSection}>
            <h2 className={styles.descriptionTitle}>Description</h2>
            <p className={styles.description}>
              {displayDescription}
            </p>
            {isLongDescription && (
              <button
                className={styles.readMore}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails