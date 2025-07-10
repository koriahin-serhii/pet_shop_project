import PromoAction from '../../components/PromoAction/PromoAction'
import Categories from '../../components/Categories/Categories'
import DiscountForm from '../../components/DiscountForm/DiscountForm'
import DiscountProducts from '../../components/DiscountProducts/DiscountProducts'
import styles from './HomePage.module.css'

const HomePage = () => {
  const handleDiscountSuccess = () => {
    // Можно добавить логику для показа уведомления об успехе
    console.log('Discount request sent successfully!')
  }

  return (
    <div className={styles.homePage}>
      <PromoAction />
      <Categories />
      <DiscountForm onDiscountSuccess={handleDiscountSuccess} />
      <DiscountProducts />
    </div>
  )
}

export default HomePage
