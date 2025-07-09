import React from 'react'
import styles from './ButtonGetDiscount.module.css'

const ButtonGetDiscount = ({ 
  onClick, 
  isSubmitted = false, 
  loading = false,
  disabled = false, 
  className = '',
  type = 'button',
  children = 'Get a discount'
}) => {
  const handleClick = () => {
    if (!disabled && !isSubmitted && !loading && onClick) {
      onClick()
    }
  }

  const getButtonClass = () => {
    let classes = [styles.button]
    
    if (isSubmitted) {
      classes.push(styles.submitted)
    } else if (loading) {
      classes.push(styles.loading)
    } else if (disabled) {
      classes.push(styles.disabled)
    }
    
    if (className) {
      classes.push(className)
    }
    
    return classes.join(' ')
  }

  const getButtonText = () => {
    if (loading) return 'Sending...'
    if (isSubmitted) return 'Request Submitted'
    return children
  }

  return (
    <button 
      className={getButtonClass()}
      onClick={handleClick}
      disabled={disabled || isSubmitted || loading}
      type={type}
    >
      {getButtonText()}
    </button>
  )
}

export default ButtonGetDiscount
