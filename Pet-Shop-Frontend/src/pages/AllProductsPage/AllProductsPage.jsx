import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard, SortingComponent } from '../../ui'
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
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Обновляем отфильтрованные товары при загрузке
  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const handleFilteredProductsChange = (filtered) => {
    setFilteredProducts(filtered)
  }

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
        
        {/* Компонент сортировки и фильтрации */}
        {products.length > 0 && (
          <SortingComponent
            products={products}
            onFilteredProductsChange={handleFilteredProductsChange}
            showDiscountFilter={true}
          />
        )}
        
        <div className={styles.productsGrid}>
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map(product => (
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

export default AllProductsPage