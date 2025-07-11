import React from 'react'
import styles from './ButtonAdd.module.css'

const ButtonAdd = ({ 
  onClick, 
  isAdded = false, 
  disabled = false, 
  className = '',
  children = 'Add to cart'
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!disabled && !isAdded && onClick) {
      onClick(e)
    }
  }

  const getButtonClass = () => {
    let classes = [styles.button]
    
    if (isAdded) {
      classes.push(styles.added)
    } else if (disabled) {
      classes.push(styles.disabled)
    }
    
    if (className) {
      classes.push(className)
    }
    
    return classes.join(' ')
  }

  return (
    <button 
      className={getButtonClass()}
      onClick={handleClick}
      disabled={disabled || isAdded}
      type="button"
    >
      {isAdded ? 'Added' : children}
    </button>
  )
}

export default ButtonAdd