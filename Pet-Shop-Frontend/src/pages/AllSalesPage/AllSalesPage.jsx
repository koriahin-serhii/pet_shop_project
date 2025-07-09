import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '../../ui'
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
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                discont_price={product.discont_price}
                image={product.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllSalesPage
