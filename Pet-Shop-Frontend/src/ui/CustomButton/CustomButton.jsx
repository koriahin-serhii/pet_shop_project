import React from 'react'
import styles from './CustomButton.module.css'

const CustomButton = ({ 
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
  ...props
}) => {
  const getButtonClass = () => {
    let classes = [styles.button]
    
    // Добавляем класс полной ширины
    if (fullWidth) {
      classes.push(styles.fullWidth)
    }
    
    // Добавляем класс отключенного состояния
    if (disabled) {
      classes.push(styles.disabled)
    }
    
    // Добавляем дополнительные классы
    if (className) {
      classes.push(className)
    }
    
    return classes.join(' ')
  }

  return (
    <button 
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default CustomButton
