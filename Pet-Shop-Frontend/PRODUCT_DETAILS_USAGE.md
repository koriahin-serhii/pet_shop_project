# ProductDetails Component Usage Guide

## Обзор

Компонент `ProductDetails` предназначен для отображения подробной информации о товаре. Он интегрируется с `QuickCounter` для добавления товара в корзину и поддерживает отображение скидок аналогично карточке товара.

## Основные возможности

- ✅ Отображение изображения товара с fallback для отсутствующих изображений
- ✅ Показ названия, цены, зачеркнутой цены и процента скидки
- ✅ Полное описание товара с функцией "Read more"/"Read less"
- ✅ Интегрированный QuickCounter для добавления в корзину
- ✅ Обработка состояний загрузки и ошибок
- ✅ Адаптивный дизайн

## API компонента

```jsx
<ProductDetails
  product={productObject}
  loading={boolean}
  error={string}
  onAddToCart={function}
/>
```

### Props

#### `product` (object)
Объект товара со следующими полями:
```javascript
{
  id: string | number,           // ID товара
  title: string,                 // Название товара
  price: number,                 // Обычная цена
  discont_price: number | null,  // Цена со скидкой (может быть null)
  image: string,                 // URL изображения
  description: string            // Описание товара
}
```

#### `loading` (boolean, опционально)
- `true` - показывает индикатор загрузки
- `false` - скрывает индикатор загрузки
- По умолчанию: `false`

#### `error` (string | null, опционально)
- Строка с описанием ошибки для отображения
- `null` - ошибок нет
- По умолчанию: `null`

#### `onAddToCart` (function, опционально)
Callback функция, вызываемая при добавлении товара в корзину:
```javascript
(productId, quantity) => {
  // productId - ID товара
  // quantity - количество товара
}
```

## Примеры использования

### Базовое использование
```jsx
import ProductDetails from '../../components/ProductDetails/ProductDetails'

const ProductPage = () => {
  const product = {
    id: 1,
    title: "Dog Food Premium",
    price: 50,
    discont_price: 35,
    image: "/images/dog-food.jpg",
    description: "High-quality premium dog food..."
  }

  const handleAddToCart = (productId, quantity) => {
    console.log(`Adding ${quantity} items of product ${productId}`)
  }

  return (
    <ProductDetails
      product={product}
      onAddToCart={handleAddToCart}
    />
  )
}
```

### С Redux (рекомендуемый способ)
```jsx
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import {
  fetchProductById,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
} from '../../redux/Slices/productsSlice'

const ProductPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(selectCurrentProduct)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const handleAddToCart = (productId, quantity) => {
    // dispatch(addToCart({ productId, quantity }))
    alert(`Added ${quantity} items to cart!`)
  }

  return (
    <ProductDetails
      product={product}
      loading={loading}
      error={error}
      onAddToCart={handleAddToCart}
    />
  )
}
```

## Отображение скидки

Компонент автоматически вычисляет и отображает скидку, если:
- `discont_price` не равно `null`
- `discont_price` меньше `price`

Процент скидки вычисляется по формуле:
```javascript
Math.round(((price - discont_price) / price) * 100)
```

## Обработка изображений

1. **Успешная загрузка**: отображается изображение товара
2. **Ошибка загрузки**: показывается плейсхолдер с текстом "Image not available"
3. **Отсутствующее изображение**: используется функция `getImageUrl()` из API утилит

## Описание товара

- **Короткое описание** (≤ 300 символов): отображается полностью
- **Длинное описание** (> 300 символов): 
  - Показываются первые 300 символов + "..."
  - Кнопка "Read more" раскрывает полный текст
  - Кнопка "Read less" сворачивает текст обратно

## Интеграция с QuickCounter

ProductDetails использует компонент `QuickCounter`, который включает:
- Counter для выбора количества (min: 0, max: 99)
- Кнопку "Add to cart"
- Автоматический сброс количества после добавления

## Стилизация

Компонент использует CSS модули (`ProductDetails.module.css`):
- Адаптивная сетка (flex layout)
- Современный дизайн с тенями и скруглениями
- Цветовая схема совместима с общим дизайном приложения
- Поддержка мобильных устройств

## Состояния компонента

### Loading (Загрузка)
```jsx
<ProductDetails loading={true} />
```
Отображает: "Loading product details..."

### Error (Ошибка)
```jsx
<ProductDetails error="Failed to load product" />
```
Отображает: "Error: Failed to load product"

### Product not found (Товар не найден)
```jsx
<ProductDetails product={null} />
```
Отображает: "Product not found"

## Навигация

Для перехода на страницу товара используйте роут:
```
/products/:id
```

Пример ссылки:
```jsx
<Link to={`/products/${productId}`}>
  View Product Details
</Link>
```

## Интеграция с ProductCard

Компонент `ProductCard` автоматически создает ссылки на ProductDetails:
```jsx
<ProductCard
  id={product.id}
  title={product.title}
  price={product.price}
  discont_price={product.discont_price}
  image={product.image}
/>
```

## Будущие улучшения

- [ ] Интеграция с Redux корзиной (замена alert на dispatch)
- [ ] Галерея изображений (множественные фото товара)
- [ ] Отзывы и рейтинги
- [ ] Рекомендуемые товары
- [ ] Социальные кнопки (поделиться)
- [ ] Увеличение изображения по клику
