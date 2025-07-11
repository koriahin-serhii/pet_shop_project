import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard, SectionHeader } from '../../ui'
import { ROUTES } from '../../utils/routes'
import { getReliablePlaceholder } from '../../utils/placeholder'
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
      image: getReliablePlaceholder(300, 200, 'Dog Food')
    },
    {
      id: 'demo-2',
      title: 'Ultra Cat Litter Tray Self-Cleaning',
      price: 600,
      discont_price: 450,
      image: getReliablePlaceholder(300, 200, 'Cat Litter')
    },
    {
      id: 'demo-3',
      title: 'Black Dog Bed, Large Size',
      price: 150,
      discont_price: 50,
      image: getReliablePlaceholder(300, 200, 'Dog Bed')
    },
    {
      id: 'demo-4',
      title: 'Cat Toy with Real Random Movement',
      price: 50,
      discont_price: 25,
      image: getReliablePlaceholder(300, 200, 'Cat Toy')
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
          <SectionHeader title="Sale" />
          <div className={styles.loading}>Loading sale products...</div>
        </div>
      </section>
    )
  }

  if (error && saleProducts.length === 0) {
    return (
      <section className={styles.discountProductsSection}>
        <div className={styles.container}>
          <SectionHeader title="Sale" />
          <div className={styles.error}>Error loading sale products: {error}</div>
        </div>
      </section>
    )
  }

  if (displayedProducts.length === 0) {
    return (
      <section className={styles.discountProductsSection}>
        <div className={styles.container}>
          <SectionHeader title="Sale" />
          <div className={styles.noProducts}>No sale products available</div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.discountProductsSection}>
      <div className={styles.container}>
        <SectionHeader 
          title="Sale" 
          linkText="All sales"
          linkTo={ROUTES.ALL_SALES}
        />
        
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