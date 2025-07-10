import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { CustomButton } from '../../ui'
import { selectCartItems, selectCartTotalCount, selectCartTotal } from '../../redux/Slices/cartSlice'
import styles from './CartForm.module.css'

const CartForm = ({ onOrderSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const cartItems = useSelector(selectCartItems)
  const totalCount = useSelector(selectCartTotalCount)
  const cartTotal = useSelector(selectCartTotal)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const orderData = {
        customer: {
          name: data.name,
          phone: data.phone,
          email: data.email
        },
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          title: item.productData?.title,
          price: item.productData?.discont_price || item.productData?.price
        })),
        total: cartTotal
      }

      // Отправляем заказ на сервер
      await axios.post('http://localhost:3333/order/send', orderData)
      
      // Очищаем форму
      reset()
      
      // Вызываем callback для показа модального окна
      if (onOrderSuccess) {
        onOrderSuccess()
      }
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error)
      alert('Произошла ошибка при оформлении заказа. Попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.cartForm}>
      <div className={styles.orderDetails}>
        <h2 className={styles.title}>Order details</h2>
        
        <div className={styles.summary}>
          <div className={styles.itemCount}>
            {totalCount} item{totalCount !== 1 ? 's' : ''}
          </div>
          <div className={styles.total}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalAmount}>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              placeholder="Phone number"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[\d\s\-()]{10,}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
            />
            {errors.phone && (
              <span className={styles.errorMessage}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          <CustomButton
            type="submit"
            disabled={isSubmitting}
            fullWidth
            className={styles.orderButton}
          >
            {isSubmitting ? 'Processing...' : 'Order'}
          </CustomButton>
        </form>
      </div>
    </div>
  )
}

export default CartForm