import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from '../../ui'
import { ROUTES } from '../../utils/routes'
import styles from './PromoAction.module.css'

const PromoAction = () => {
  const navigate = useNavigate()

  const handleCheckOutClick = () => {
    navigate(ROUTES.ALL_SALES)
  }

  return (
    <section className={styles.promoSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Amazing Discounts<br />
          on Pets Products!
        </h1>
        <CustomButton 
          onClick={handleCheckOutClick}
          className={styles.button}
        >
          Check out
        </CustomButton>
      </div>
    </section>
  )
}

export default PromoAction