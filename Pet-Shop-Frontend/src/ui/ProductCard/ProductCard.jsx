import React from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../utils/api'
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
  // Вычисляем процент скидки
  const calculateDiscountPercent = () => {
    if (!discont_price || !price) return null
    return Math.round((1 - discont_price / price) * 100)
  }

  const discountPercent = calculateDiscountPercent()
  
  // Обработка URL изображения
  const getImageSrc = () => {
    if (!image) return 'https://via.placeholder.com/300x200/F5F5F5/999999?text=No+Image'
    if (image.startsWith('http')) return image // Если уже полный URL
    return getImageUrl(image) // Иначе используем утилиту API
  }
  
  const imageUrl = getImageSrc()

  const cardContent = (
    <div className={`${styles.card} ${className || ''}`}>
      {/* Метка скидки */}
      {discountPercent && (
        <div className={styles.discountBadge}>
          -{discountPercent}%
        </div>
      )}
      
      {/* Изображение товара */}
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/F5F5F5/999999?text=No+Image'
          }}
        />
      </div>
      
      {/* Информация о товаре */}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        
        {/* Цены */}
        <div className={styles.priceContainer}>
          {discont_price ? (
            // Товар со скидкой
            <>
              <span className={styles.discountPrice}>${discont_price}</span>
              <span className={styles.originalPrice}>${price}</span>
            </>
          ) : (
            // Обычный товар
            <span className={styles.price}>${price}</span>
          )}
        </div>
      </div>
    </div>
  )

  // Если передан onClick, рендерим как кликабельный div
  if (onClick) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {cardContent}
      </div>
    )
  }

  // Иначе рендерим как Link
  return (
    <Link to={`/products/${id}`} className={styles.cardLink}>
      {cardContent}
    </Link>
  )
}

export default ProductCard