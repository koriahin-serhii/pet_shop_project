import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ShoppingCartPage.module.css'
import { ROUTES } from '../../utils/routes'

const ShoppingCartPage = () => {
  return (
    <section className={styles.cartSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shopping cart</h2>

          <Link to={ROUTES.MAIN} className={styles.mainLink}>
            All categories
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ShoppingCartPage
