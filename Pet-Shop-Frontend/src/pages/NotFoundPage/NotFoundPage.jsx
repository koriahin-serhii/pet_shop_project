import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomButton } from '../../ui'
import { ROUTES } from '../../utils/routes'
import notFoundImage from '../../assets/images/not-found-page-image.png'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={notFoundImage}
            alt="Page not found"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage.
          </p>

          <CustomButton onClick={handleGoHome} className={styles.homeButton}>
            Go Home
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
