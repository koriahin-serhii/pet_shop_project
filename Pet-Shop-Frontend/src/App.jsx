import './App.css'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './utils/routes'
import HomePage from './pages/HomePage/HomePage'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage'
import AllProductsPage from './pages/AllProductsPage/AllProductsPage'
import AllSalesPage from './pages/AllSalesPage/AllSalesPage'
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import CategoryProductsPage from './pages/CategoryProductsPage/CategoryProductsPage'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path={ROUTES.MAIN} element={<HomePage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.ALL_PRODUCTS} element={<AllProductsPage />} />
          <Route path={ROUTES.ALL_SALES} element={<AllSalesPage />} />
          <Route path={ROUTES.SHOPPING_CART} element={<ShoppingCartPage />} />
          <Route
            path={`${ROUTES.CATEGORIES}/:categoryID`}
            element={<CategoryProductsPage />}
          />
          <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
