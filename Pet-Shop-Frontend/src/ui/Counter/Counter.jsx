import React, { useState, useEffect } from 'react'
import styles from './Counter.module.css'
import minusIcon from '../../assets/icons/minus.svg'
import plusIcon from '../../assets/icons/plus.svg'

const Counter = ({ 
  value = 0,
  min = 0,
  max = 999,
  step = 1,
  disabled = false,
  onChange,
  className = ''
}) => {
  const [currentValue, setCurrentValue] = useState(value)

  // Синхронизируем внутреннее состояние с внешним значением
  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleIncrement = () => {
    if (disabled) return
    
    const newValue = Math.min(currentValue + step, max)
    setCurrentValue(newValue)
    
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleDecrement = () => {
    if (disabled) return
    
    const newValue = Math.max(currentValue - step, min)
    setCurrentValue(newValue)
    
    if (onChange) {
      onChange(newValue)
    }
  }

  const canDecrement = !disabled && currentValue > min
  const canIncrement = !disabled && currentValue < max

  return (
    <div className={`${styles.counter} ${className}`}>
      <button
        type="button"
        className={`${styles.counterButton} ${styles.minusButton}`}
        onClick={handleDecrement}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
      >
        <img src={minusIcon} alt="Minus" width="24" height="24" />
      </button>
      
      <div className={styles.counterValue}>
        <span>{currentValue}</span>
      </div>
      
      <button
        type="button"
        className={`${styles.counterButton} ${styles.plusButton}`}
        onClick={handleIncrement}
        disabled={!canIncrement}
        aria-label="Increase quantity"
      >
        <img src={plusIcon} alt="Plus" width="24" height="24" />
      </button>
    </div>
  )
}

export default Counter