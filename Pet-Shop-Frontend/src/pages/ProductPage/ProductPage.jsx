import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import {
  fetchProductById,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
} from '../../redux/Slices/productsSlice'
import { addToCart } from '../../redux/Slices/cartSlice'
import styles from './ProductPage.module.css'

const ProductPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(selectCurrentProduct)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity }))
    
    // Показываем улучшенное уведомление
    const productName = product?.title || `Product ${productId}`
    const message = `✅ ${productName} (${quantity} item${quantity > 1 ? 's' : ''}) added to cart!`
    
    // Временно используем alert, но можно заменить на toast-уведомление
    alert(message)
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <ProductDetails
          product={product}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}

export default ProductPage