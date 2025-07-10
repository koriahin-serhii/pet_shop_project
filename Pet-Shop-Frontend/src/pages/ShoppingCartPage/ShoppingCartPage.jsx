import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import CartForm from '../../components/CartForm/CartForm'
import { OrderSuccessModal, CustomButton, SectionHeader } from '../../ui'
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
    // НЕ очищаем корзину сразу - оставляем товары на заднем фоне
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Очищаем корзину только при закрытии модального окна
    dispatch(clearCart())
  }

  const handleGoHome = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <section className={styles.cartSection}>
      <div className={styles.container}>
        <SectionHeader 
          title="Shopping cart" 
          linkText="Back to the store"
          linkTo={ROUTES.MAIN}
        />

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
