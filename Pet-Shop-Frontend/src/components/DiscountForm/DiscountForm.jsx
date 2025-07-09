import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonGetDiscount } from '../../ui'
import { 
  sendDiscountRequest, 
  selectDiscountLoading, 
  selectDiscountError, 
  selectDiscountSuccess,
  selectSubmittedEmails,
  clearError,
  resetForm
} from '../../redux/Slices/discountSlice'
import discountBannerImage from '../../assets/images/discount-banner-image.png'
import styles from './DiscountForm.module.css'

const DiscountForm = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectDiscountLoading)
  const error = useSelector(selectDiscountError)
  const success = useSelector(selectDiscountSuccess)
  const submittedEmails = useSelector(selectSubmittedEmails)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const watchedEmail = watch('email')
  const isEmailSubmitted = submittedEmails.includes(watchedEmail)

  useEffect(() => {
    if (success) {
      // Сбрасываем форму после успешной отправки
      reset()
      // Очищаем состояние через 3 секунды
      setTimeout(() => {
        dispatch(resetForm())
      }, 3000)
    }
  }, [success, reset, dispatch])

  const onSubmit = (data) => {
    if (!isEmailSubmitted) {
      dispatch(sendDiscountRequest(data))
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return (
    <section className={styles.discountSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>5% off on the first order</h2>
            <div className={styles.imageContainer}>
              <img 
                src={discountBannerImage}
                alt="Pets getting discount" 
                className={styles.bannerImage}
              />
            </div>
          </div>
          
          <div className={styles.formContainer}>
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
                      value: /^[+]?[1-9][\d]{0,15}$/,
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

              <div className={styles.buttonContainer}>
                <ButtonGetDiscount 
                  type="submit"
                  disabled={loading || isEmailSubmitted}
                  isSubmitted={success || isEmailSubmitted}
                  loading={loading}
                >
                  Get a discount
                </ButtonGetDiscount>
              </div>

              {error && (
                <div className={styles.errorContainer}>
                  <p className={styles.errorText}>{error}</p>
                  <button 
                    type="button" 
                    onClick={handleClearError}
                    className={styles.clearErrorButton}
                  >
                    ×
                  </button>
                </div>
              )}

              {success && (
                <div className={styles.successContainer}>
                  <p className={styles.successText}>
                    🎉 Discount request sent successfully! Check your email for details.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscountForm