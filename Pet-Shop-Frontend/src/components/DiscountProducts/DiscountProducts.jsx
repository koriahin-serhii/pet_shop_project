import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '../../ui'
import { ROUTES } from '../../utils/routes'
import { 
  fetchSaleProducts, 
  selectSaleProducts, 
  selectProductsLoading, 
  selectProductsError 
} from '../../redux/Slices/productsSlice'
import styles from './DiscountProducts.module.css'

const DiscountProducts = ({ limit = 4 }) => {
  const dispatch = useDispatch()
  const saleProducts = useSelector(selectSaleProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  // Fallback данные для демонстрации
  const fallbackProducts = [
    {
      id: 'demo-1',
      title: 'Dry Dog Food for Adult Dogs',
      price: 100,
      discont_price: 80,
      image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Dog+Food'
    },
    {
      id: 'demo-2',
      title: 'Ultra Cat Litter Tray Self-Cleaning',
      price: 600,
      discont_price: 450,
      image: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Cat+Litter'
    },
    {
      id: 'demo-3',
      title: 'Black Dog Bed, Large Size',
      price: 150,
      discont_price: 50,
      image: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Dog+Bed'
    },
    {
      id: 'demo-4',
      title: 'Cat Toy with Real Random Movement',
      price: 50,
      discont_price: 25,
      image: 'https://via.placeholder.com/300x200/F7DC6F/333333?text=Cat+Toy'
    }
  ]

  useEffect(() => {
    // Загружаем товары со скидкой при монтировании компонента
    dispatch(fetchSaleProducts())
  }, [dispatch])

  // Получаем случайные товары со скидкой (перемешиваем массив и берем первые limit элементов)
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Используем данные из Redux или fallback данные
  const productsToShow = saleProducts.length > 0 ? saleProducts : fallbackProducts
  const displayedProducts = getRandomProducts(productsToShow, limit)

  if (loading) {
    return (
      <section className={styles.discountProductsSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Sale</h2>
          </div>
          <div className={styles.loading}>Loading sale products...</div>
        </div>
      </section>
    )
  }

  if (error && saleProducts.length === 0) {
    return (
      <section className={styles.discountProductsSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Sale</h2>
          </div>
          <div className={styles.error}>Error loading sale products: {error}</div>
        </div>
      </section>
    )
  }

  if (displayedProducts.length === 0) {
    return (
      <section className={styles.discountProductsSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Sale</h2>
          </div>
          <div className={styles.noProducts}>No sale products available</div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.discountProductsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sale</h2>
          <Link to={ROUTES.ALL_SALES} className={styles.allSalesLink}>
            All sales
          </Link>
        </div>
        
        <div className={styles.productsGrid}>
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              discont_price={product.discont_price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiscountProducts