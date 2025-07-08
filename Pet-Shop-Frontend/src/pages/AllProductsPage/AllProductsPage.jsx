import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchProducts, 
  selectProducts, 
  selectProductsLoading, 
  selectProductsError 
} from '../../redux/Slices/productsSlice'
import styles from './AllProductsPage.module.css'

const AllProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) {
    return (
      <div className={styles.allProductsPage}>
        <div className={styles.container}>
          <h1>All Products</h1>
          <div className={styles.loading}>Loading products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.allProductsPage}>
        <div className={styles.container}>
          <h1>All Products</h1>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.allProductsPage}>
      <div className={styles.container}>
        <h1>All Products</h1>
        <div className={styles.productsGrid}>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                {/* Здесь будет использоваться ProductCard компонент */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllProductsPage