import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SectionHeader.module.css'

const SectionHeader = ({ 
  title, 
  linkText, 
  linkTo, 
  className = '', 
  titleTag = 'h2' 
}) => {
  const TitleTag = titleTag

  return (
    <div className={`${styles.header} ${className}`}>
      <TitleTag className={styles.title}>{title}</TitleTag>
      
      {linkText && linkTo && (
        <div className={styles.linkContainer}>
          <div className={styles.decorativeLine}></div>
          <Link to={linkTo} className={styles.link}>
            {linkText}
          </Link>
        </div>
      )}
    </div>
  )
}

export default SectionHeader