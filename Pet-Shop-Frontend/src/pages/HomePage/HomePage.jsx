import PromoAction from '../../components/PromoAction/PromoAction'
import Categories from '../../components/Categories/Categories'
import DiscountProducts from '../../components/DiscountProducts/DiscountProducts'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <PromoAction />
      <Categories />
      <DiscountProducts />
    </div>
  )
}

export default HomePage
