import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null

  return (
    <nav
      className={`${styles.breadcrumbs} ${className}`}
      aria-label="breadcrumb"
    >
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index < items.length - 1 ? (
              <Link to={item.path} className={styles.breadcrumbLink}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
