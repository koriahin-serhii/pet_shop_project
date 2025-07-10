import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ButtonGetDiscount } from '../../ui'
import styles from './DiscountForm.module.css'

const DiscountForm = ({ onDiscountSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const discountData = {
        name: data.name,
        phone: data.phone,
        email: data.email
      }

      // Отправляем заявку на купон на сервер
      await axios.post('http://localhost:3333/sale/send', discountData)
      
      // Очищаем форму
      reset()
      setIsSubmitted(true)
      
      // Вызываем callback при успехе (если нужно)
      if (onDiscountSuccess) {
        onDiscountSuccess()
      }

      // Показываем сообщение об успехе на 3 секунды
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error sending discount request:', error)
      alert('Ошибка при отправке заявки. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>5% off on the first order</h2>
      
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={styles.animalsImage}>
            {/* Здесь будет изображение с животными */}
          </div>
        </div>

        <div className={styles.formSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
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
              {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            </div>

            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email'
                  }
                })}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <ButtonGetDiscount
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              isSubmitted={isSubmitted}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Sending...' : isSubmitted ? 'Request sent!' : 'Get a discount'}
            </ButtonGetDiscount>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DiscountForm