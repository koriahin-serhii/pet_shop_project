import React from 'react'
import PromoAction from '../../components/PromoAction/PromoAction'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <PromoAction />

      <div className={styles.content}>
        <h2>Welcome to Pet Shop!</h2>
        <p>Here you will find everything you need for your pets.</p>
      </div>
    </div>
  )
}

export default HomePage
