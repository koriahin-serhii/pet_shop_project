import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard, SortingComponent } from '../../ui'
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
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    dispatch(fetchSaleProducts())
  }, [dispatch])

  // Update filtered products when loading
  useEffect(() => {
    setFilteredProducts(saleProducts)
  }, [saleProducts])

  const handleFilteredProductsChange = (filtered) => {
    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className={styles.allSalesPage}>
        <div className={styles.container}>
          <h1>Discounted items</h1>
          <div className={styles.loading}>Loading sale products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.allSalesPage}>
        <div className={styles.container}>
          <h1>Discounted items</h1>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.allSalesPage}>
      <div className={styles.container}>
        <h1>Discounted items</h1>
        
        {/* Sorting and filtering component (without discount checkbox) */}
        {saleProducts.length > 0 && (
          <SortingComponent
            products={saleProducts}
            onFilteredProductsChange={handleFilteredProductsChange}
            showDiscountFilter={false}
          />
        )}
        
        <div className={styles.productsGrid}>
          {filteredProducts.length === 0 ? (
            <p>No sale products found.</p>
          ) : (
            filteredProducts.map((product) => (
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
