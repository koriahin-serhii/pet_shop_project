import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSaleProducts,
  selectSaleProducts,
  selectProductsLoading,
  selectProductsError,
} from '../../redux/Slices/productsSlice'
import styles from './AllSalesPage.module.css'

const AllSalesPage = () => {
  const dispatch = useDispatch()
  const saleProducts = useSelector(selectSaleProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    dispatch(fetchSaleProducts())
  }, [dispatch])

  if (loading) {
    return (
      <div className={styles.allSalesPage}>
        <div className={styles.container}>
          <h1>All Sales</h1>
          <div className={styles.loading}>Loading sale products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.allSalesPage}>
        <div className={styles.container}>
          <h1>All Sales</h1>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.allSalesPage}>
      <div className={styles.container}>
        <h1>All Sales</h1>
        <div className={styles.productsGrid}>
          {saleProducts.length === 0 ? (
            <p>No sale products found.</p>
          ) : (
            saleProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <h3>{product.title}</h3>
                <p>Original Price: ${product.price}</p>
                <p>Sale Price: ${product.discont_price}</p>
                <p>
                  Discount:{' '}
                  {Math.round(
                    (1 - product.discont_price / product.price) * 100
                  )}
                  %
                </p>
                {/* Здесь будет использоваться ProductCard компонент */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllSalesPage
