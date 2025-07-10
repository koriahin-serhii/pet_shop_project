import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoriesCard, SectionHeader } from '../../ui'
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
    // Load categories only if they haven't been loaded yet
    if (!initialized) {
      dispatch(fetchCategories())
    }
  }, [dispatch, initialized])

  if (loading) {
    return (
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <SectionHeader title="Categories" />
          <div className={styles.loading}>Loading categories...</div>
        </div>
      </section>
    )
  }

  if (error && categories.length === 0) {
    return (
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <SectionHeader title="Categories" />
          <div className={styles.error}>Error loading categories: {error}</div>
        </div>
      </section>
    )
  }

  const displayedCategories = showAll ? categories : categories.slice(0, limit)

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <SectionHeader 
          title="Categories" 
          linkText={!showAll && categories.length > limit ? "All categories" : null}
          linkTo={!showAll && categories.length > limit ? ROUTES.CATEGORIES : null}
        />
        
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