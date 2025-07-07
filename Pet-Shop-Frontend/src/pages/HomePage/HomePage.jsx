import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/Slices/cartSlice'
import styles from './HomePage.module.css'

const HomePage = () => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const testProduct = {
      id: Date.now(),
      name: 'Test Product',
      price: 100
    }
    dispatch(addToCart(testProduct))
  }

  return (
    <div className={styles.homePage}>
      <h1>Welcome to Pet Shop!</h1>
      <p>Here you will find everything you need for your pets.</p>
      
      <button onClick={handleAddToCart} className={styles.testButton}>
        Add Test Product to Cart
      </button>
    </div>
  )
}

export default HomePage