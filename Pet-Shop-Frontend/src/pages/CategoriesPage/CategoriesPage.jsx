import React from 'react'
import Categories from '../../components/Categories/Categories'
import styles from './CategoriesPage.module.css'

const CategoriesPage = () => {
  return (
    <div className={styles.categoriesPage}>
      <Categories showAll={true} />
    </div>
  )
}

export default CategoriesPage