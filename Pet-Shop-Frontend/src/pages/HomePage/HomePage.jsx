import PromoAction from '../../components/PromoAction/PromoAction'
import Categories from '../../components/Categories/Categories'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <PromoAction />
      <Categories />
      
      
    </div>
  )
}

export default HomePage
