import React from 'react'
import styles from './ButtonGetDiscount.module.css'

const ButtonGetDiscount = ({ 
  onClick, 
  isSubmitted = false, 
  disabled = false, 
  className = '',
  children = 'Get a discount'
}) => {
  const handleClick = () => {
    if (!disabled && !isSubmitted && onClick) {
      onClick()
    }
  }

  const getButtonClass = () => {
    let classes = [styles.button]
    
    if (isSubmitted) {
      classes.push(styles.submitted)
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
      disabled={disabled || isSubmitted}
      type="button"
    >
      {isSubmitted ? 'Request Submitted' : children}
    </button>
  )
}

export default ButtonGetDiscount
