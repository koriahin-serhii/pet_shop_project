# Counter Component

Простой компонент Counter для изменения количества товаров в корзине или на странице товара.

## Основные характеристики

- **Размер**: 200px × 58px
- **Адаптивный дизайн**: поддерживает мобильные устройства (180px × 52px)
- **Минимальная функциональность**: только кнопки + и -
- **Доступность**: поддержка ARIA-атрибутов

## Использование

### Базовое использование

```jsx
import { Counter } from '../ui'

function ProductPage() {
  const [quantity, setQuantity] = useState(0)

  return (
    <Counter
      value={quantity}
      onChange={setQuantity}
      min={0}
      max={10}
    />
  )
}
```

### С минимальным значением 1

```jsx
<Counter
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={99}
/>
```

### Заблокированный

```jsx
<Counter
  value={5}
  disabled={true}
  min={0}
  max={20}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | 0 | Текущее значение счетчика |
| `min` | number | 0 | Минимальное значение |
| `max` | number | 999 | Максимальное значение |
| `step` | number | 1 | Шаг изменения |
| `disabled` | boolean | false | Заблокировать взаимодействие |
| `onChange` | function | - | Обработчик изменения значения |
| `className` | string | '' | Дополнительные CSS классы |

## QuickCounter

Компонент QuickCounter - это расширенная версия Counter с кнопкой "Add to cart".

### Использование QuickCounter

```jsx
import { QuickCounter } from '../ui'

function ProductCard() {
  const handleAddToCart = (productId, quantity) => {
    // Логика добавления в корзину
    console.log(`Add ${quantity} items of product ${productId}`)
  }

  return (
    <QuickCounter
      productId={123}
      onAddToCart={handleAddToCart}
    />
  )
}
```

### Props QuickCounter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `productId` | number/string | - | ID товара |
| `onAddToCart` | function | - | Обработчик добавления в корзину (productId, quantity) |
| `disabled` | boolean | false | Заблокировать взаимодействие |
| `className` | string | '' | Дополнительные CSS классы |

## Особенности

1. **Иконки**: Используются SVG иконки из assets (plus.svg, minus.svg)
2. **Валидация**: Автоматическая проверка границ min/max
3. **Адаптивность**: Автоматическая адаптация под мобильные устройства
4. **Анимации**: Плавные переходы и hover-эффекты
5. **Простота**: Минимальный функционал без лишних опций

## Интеграция с Redux

```jsx
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'

function ProductPage({ product }) {
  const dispatch = useDispatch()
  
  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity }))
  }

  return (
    <QuickCounter
      productId={product.id}
      onAddToCart={handleAddToCart}
    />
  )
}
```

## Стилизация

Компонент использует CSS Modules и поддерживает кастомизацию через className prop.

```css
/* Пример кастомизации */
.customCounter {
  border: 2px solid #007bff;
  border-radius: 12px;
}
```

```jsx
<Counter className="customCounter" />
```
