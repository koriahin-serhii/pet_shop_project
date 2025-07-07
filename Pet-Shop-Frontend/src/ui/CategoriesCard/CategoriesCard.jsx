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

  // Если передан prop "to", оборачиваем в Link
  if (to) {
    return (
      <Link to={to} className={styles.link}>
        {content}
      </Link>
    )
  }

  // Если передан onClick, оборачиваем в div с обработчиком
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

  // Обычная карточка без интерактивности
  return content
}

export default CategoriesCard
