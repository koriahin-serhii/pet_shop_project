# API Utilities Documentation

## Обзор

Приложение использует централизованную систему API утилит на основе Axios и Redux Toolkit для управления всеми HTTP запросами.

## Структура

```
src/
  utils/
    api.js                 # Основные API утилиты
  redux/
    Slices/
      categoriesSlice.js   # Управление категориями
      productsSlice.js     # Управление товарами
      cartSlice.js         # Управление корзиной
    store.js               # Конфигурация Redux store
```

## API Утилиты (src/utils/api.js)

### Конфигурация
- **baseURL**: `http://localhost:3333`
- **timeout**: 10 секунд
- **headers**: `Content-Type: application/json`

### Утилиты

#### `getImageUrl(imagePath)`
Создает полный URL для изображений:
```javascript
import { getImageUrl } from '../utils/api'

const imageUrl = getImageUrl('/uploads/image.jpg') // http://localhost:3333/uploads/image.jpg
const externalUrl = getImageUrl('https://example.com/image.jpg') // https://example.com/image.jpg
```

### API методы

#### categoriesAPI
```javascript
import { categoriesAPI } from '../utils/api'

// Получить все категории
const categories = await categoriesAPI.getAll()

// Получить категорию по ID
const category = await categoriesAPI.getById(1)
```

#### productsAPI
```javascript
import { productsAPI } from '../utils/api'

// Получить все товары
const products = await productsAPI.getAll()

// Получить товар по ID
const product = await productsAPI.getById(1)

// Получить товары по категории
const categoryProducts = await productsAPI.getByCategory(1)

// Получить товары со скидкой
const saleProducts = await productsAPI.getSales()
```

## Redux Slices

### categoriesSlice

#### Actions
```javascript
import { fetchCategories } from '../redux/Slices/categoriesSlice'

// Загрузить категории
dispatch(fetchCategories())
```

#### Selectors
```javascript
import { 
  selectCategories, 
  selectCategoriesLoading, 
  selectCategoriesError,
  selectCategoriesInitialized 
} from '../redux/Slices/categoriesSlice'

const categories = useSelector(selectCategories)
const loading = useSelector(selectCategoriesLoading)
const error = useSelector(selectCategoriesError)
const initialized = useSelector(selectCategoriesInitialized)
```

### productsSlice

#### Actions
```javascript
import { 
  fetchProducts, 
  fetchProductById, 
  fetchProductsByCategory, 
  fetchSaleProducts 
} from '../redux/Slices/productsSlice'

// Загрузить все товары
dispatch(fetchProducts())

// Загрузить товар по ID
dispatch(fetchProductById(1))

// Загрузить товары по категории
dispatch(fetchProductsByCategory(1))

// Загрузить товары со скидкой
dispatch(fetchSaleProducts())
```

#### Selectors
```javascript
import { 
  selectProducts, 
  selectCurrentProduct, 
  selectCategoryProducts, 
  selectSaleProducts,
  selectProductsLoading, 
  selectProductsError 
} from '../redux/Slices/productsSlice'

const products = useSelector(selectProducts)
const currentProduct = useSelector(selectCurrentProduct)
const categoryProducts = useSelector(selectCategoryProducts)
const saleProducts = useSelector(selectSaleProducts)
const loading = useSelector(selectProductsLoading)
const error = useSelector(selectProductsError)
```

## Использование в компонентах

### Пример: Загрузка категорий
```javascript
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchCategories, 
  selectCategories, 
  selectCategoriesLoading 
} from '../redux/Slices/categoriesSlice'

const CategoriesComponent = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const loading = useSelector(selectCategoriesLoading)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>{category.title}</div>
      ))}
    </div>
  )
}
```

### Пример: Обработка изображений
```javascript
import { getImageUrl } from '../utils/api'

const ProductCard = ({ product }) => (
  <div>
    <img src={getImageUrl(product.image)} alt={product.title} />
    <h3>{product.title}</h3>
  </div>
)
```

## Fallback данные

Система включает fallback данные для категорий на случай недоступности сервера. Это обеспечивает работоспособность приложения даже без подключения к API.

## Обработка ошибок

Все API вызовы включают централизованную обработку ошибок через Axios interceptors и Redux error states.

## Кэширование

Redux автоматически кэширует загруженные данные, предотвращая повторные запросы при переходах между страницами.
