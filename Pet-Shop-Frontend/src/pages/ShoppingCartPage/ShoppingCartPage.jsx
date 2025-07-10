import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import CartForm from '../../components/CartForm/CartForm'
import { OrderSuccessModal, CustomButton } from '../../ui'
import {
  selectCartItems,
  selectCartTotalCount,
  clearCart,
} from '../../redux/Slices/cartSlice'
import { selectProducts } from '../../redux/Slices/productsSlice'
import styles from './ShoppingCartPage.module.css'
import { ROUTES } from '../../utils/routes'

const ShoppingCartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector(selectCartItems)
  const totalCount = useSelector(selectCartTotalCount)
  const products = useSelector(selectProducts)

  // Получаем полные данные о товарах в корзине
  const cartItemsWithData = cartItems
    .map((item) => {
      const productData =
        item.productData || products.find((p) => p.id === item.id)
      return {
        ...item,
        productData,
      }
    })
    .filter((item) => item.productData) // Убираем товары без данных

  const handleOrderSuccess = () => {
    setIsModalOpen(true)
    // Очищаем корзину после успешного заказа
    dispatch(clearCart())
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleGoHome = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <section className={styles.cartSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shopping cart</h2>

          <Link to={ROUTES.MAIN} className={styles.mainLink}>
            All categories
          </Link>
        </div>

        {/* Если корзина пуста */}
        {totalCount === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyMessage}>
              Looks like you have no items in your basket currently.
            </p>
            <CustomButton
              onClick={handleGoHome}
              className={styles.continueButton}
            >
              Continue Shopping
            </CustomButton>
          </div>
        ) : (
          /* Если в корзине есть товары */
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              {cartItemsWithData.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className={styles.cartSidebar}>
              <CartForm onOrderSuccess={handleOrderSuccess} />
            </div>
          </div>
        )}
      </div>

      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  )
}

export default ShoppingCartPage
