import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES } from '../../utils/routes'
import logo from '../../assets/icons/logo.svg'
import basketIcon from '../../assets/icons/basket-empty.svg'
import styles from './Header.module.css'

const Header = () => {
  const cartCount = useSelector(state => state.cart.totalCount)
  const location = useLocation()

  // Function to determine active link
  const isActiveLink = (path) => {
    if (path === ROUTES.MAIN) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to={ROUTES.MAIN} className={styles.logo}>
          <img src={logo} alt="Pet Shop Logo" />
        </Link>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <Link 
            to={ROUTES.MAIN} 
            className={`${styles.navLink} ${isActiveLink(ROUTES.MAIN) ? styles.active : ''}`}
          >
            Main Page
          </Link>
          <Link 
            to={ROUTES.CATEGORIES} 
            className={`${styles.navLink} ${isActiveLink(ROUTES.CATEGORIES) ? styles.active : ''}`}
          >
            Categories
          </Link>
          <Link 
            to={ROUTES.ALL_PRODUCTS} 
            className={`${styles.navLink} ${isActiveLink(ROUTES.ALL_PRODUCTS) ? styles.active : ''}`}
          >
            All products
          </Link>
          <Link 
            to={ROUTES.ALL_SALES} 
            className={`${styles.navLink} ${isActiveLink(ROUTES.ALL_SALES) ? styles.active : ''}`}
          >
            All sales
          </Link>
        </nav>

        {/* Cart */}
        <Link to={ROUTES.SHOPPING_CART} className={styles.cart}>
          <img src={basketIcon} alt="Shopping Cart" className={styles.cartIcon} />
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header