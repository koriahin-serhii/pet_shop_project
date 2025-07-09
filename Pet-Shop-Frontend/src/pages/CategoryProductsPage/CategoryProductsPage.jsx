import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard, SortingComponent } from '../../ui'
import {
  fetchProductsByCategory,
  selectCategoryProducts,
  selectCurrentCategory,
  selectProductsLoading,
  selectProductsError,
} from '../../redux/Slices/productsSlice'
import styles from './CategoryProductsPage.module.css'

const CategoryProductsPage = () => {
  const { categoryID } = useParams()
  const dispatch = useDispatch()
  const categoryProducts = useSelector(selectCategoryProducts)
  const currentCategory = useSelector(selectCurrentCategory)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (categoryID) {
      console.log('Fetching products for category ID:', categoryID)
      dispatch(fetchProductsByCategory(categoryID))
    }
  }, [dispatch, categoryID])

  // Обновляем отфильтрованные товары при загрузке
  useEffect(() => {
    console.log('Category products updated:', categoryProducts)
    setFilteredProducts(categoryProducts)
  }, [categoryProducts])

  const handleFilteredProductsChange = (filtered) => {
    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className={styles.categoryProductsPage}>
        <div className={styles.container}>
          <h1>{currentCategory?.title || 'Category Products'}</h1>
          <div className={styles.loading}>Loading products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.categoryProductsPage}>
        <div className={styles.container}>
          <h1>{currentCategory?.title || 'Category Products'}</h1>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.categoryProductsPage}>
      <div className={styles.container}>
        <h1>{currentCategory?.title || 'Category Products'}</h1>
        
        {/* Компонент сортировки и фильтрации */}
        {categoryProducts.length > 0 && (
          <SortingComponent
            products={categoryProducts}
            onFilteredProductsChange={handleFilteredProductsChange}
            showDiscountFilter={true}
          />
        )}
        
        <div className={styles.productsGrid}>
          {filteredProducts.length === 0 ? (
            <p>No products found in this category.</p>
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

export default CategoryProductsPage