import PromoAction from '../../components/PromoAction/PromoAction'
import Categories from '../../components/Categories/Categories'
import DiscountForm from '../../components/DiscountForm/DiscountForm'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <PromoAction />
      <Categories />
      <DiscountForm />
    </div>
  )
}

export default HomePage
