import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CategoriesCard.module.css'

const CategoriesCard = ({ 
  id,
  title,
  image,
  onClick,
  to,
  className = ''
}) => {
  const content = (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  )

  // If "to" prop is passed, wrap in Link
  if (to) {
    return (
      <Link to={to} className={styles.link}>
        {content}
      </Link>
    )
  }

  // If onClick is passed, wrap in div with handler
  if (onClick) {
    return (
      <div 
        onClick={() => onClick(id)}
        className={styles.clickable}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(id)
          }
        }}
      >
        {content}
      </div>
    )
  }

  // Regular card without interactivity
  return content
}

export default CategoriesCard
