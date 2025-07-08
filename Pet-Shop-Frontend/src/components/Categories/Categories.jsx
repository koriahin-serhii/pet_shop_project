import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CategoriesCard } from '../../ui'
import { ROUTES } from '../../utils/routes'
import { getImageUrl } from '../../utils/api'
import { 
  fetchCategories, 
  selectCategories, 
  selectCategoriesLoading, 
  selectCategoriesError,
  selectCategoriesInitialized 
} from '../../redux/Slices/categoriesSlice'
import styles from './Categories.module.css'

const Categories = ({ showAll = false, limit = 4 }) => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const loading = useSelector(selectCategoriesLoading)
  const error = useSelector(selectCategoriesError)
  const initialized = useSelector(selectCategoriesInitialized)

  useEffect(() => {
    // Загружаем категории только если они еще не были загружены
    if (!initialized) {
      dispatch(fetchCategories())
    }
  }, [dispatch, initialized])

  if (loading) {
    return (
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Categories</h2>
          </div>
          <div className={styles.loading}>Loading categories...</div>
        </div>
      </section>
    )
  }

  if (error && categories.length === 0) {
    return (
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Categories</h2>
          </div>
          <div className={styles.error}>Error loading categories: {error}</div>
        </div>
      </section>
    )
  }

  const displayedCategories = showAll ? categories : categories.slice(0, limit)

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Categories</h2>
          {!showAll && categories.length > limit && (
            <Link to={ROUTES.CATEGORIES} className={styles.allCategoriesLink}>
              All categories
            </Link>
          )}
        </div>
        
        <div className={styles.categoriesGrid}>
          {displayedCategories.map(category => (
            <CategoriesCard
              key={category.id}
              id={category.id}
              title={category.title}
              image={getImageUrl(category.image)}
              to={`${ROUTES.CATEGORIES}/${category.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories