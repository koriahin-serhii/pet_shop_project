# Breadcrumbs Component

Компонент для отображения хлебных крошек (навигационных ссылок), показывающих текущее местоположение пользователя на сайте.

## Использование

```jsx
import { Breadcrumbs } from '../../ui'
import { ROUTES } from '../../utils/routes'

const breadcrumbsData = [
  { label: 'Main page', path: ROUTES.HOME },
  { label: 'Categories', path: ROUTES.CATEGORIES }
]

<Breadcrumbs items={breadcrumbsData} />
```

## Props

| Prop        | Type                                   | Required | Default | Description                                  |
| ----------- | -------------------------------------- | -------- | ------- | -------------------------------------------- |
| `items`     | `Array<{label: string, path: string}>` | ✅       | -       | Массив объектов с данными для хлебных крошек |
| `className` | `string`                               | ❌       | `''`    | Дополнительные CSS классы                    |

## Особенности

- **Автоматическая стилизация**: Последний элемент не является ссылкой и выделен как текущая страница
- **Разделители**: Между элементами автоматически добавляются круглые точки
- **Респонсивность**: Адаптивный дизайн для мобильных устройств
- **Доступность**: Использует семантичную навигацию с `aria-label="breadcrumb"`

## Примеры использования

### Категории

```jsx
const breadcrumbsData = [
  { label: 'Main page', path: ROUTES.HOME },
  { label: 'Categories', path: ROUTES.CATEGORIES },
]
```

### Все товары

```jsx
const breadcrumbsData = [
  { label: 'Main page', path: ROUTES.HOME },
  { label: 'All products', path: ROUTES.ALL_PRODUCTS },
]
```

### Товары со скидками

```jsx
const breadcrumbsData = [
  { label: 'Main page', path: ROUTES.HOME },
  { label: 'All sales', path: ROUTES.ALL_SALES },
]
```

### Товары категории

```jsx
const breadcrumbsData = [
  { label: 'Main page', path: ROUTES.HOME },
  { label: 'Categories', path: ROUTES.CATEGORIES },
  { label: 'Dry & Wet Food', path: `/categories/${categoryId}` },
]
```

## Дизайн

Компонент следует дизайну:

- Элементы отображаются как кнопки с серым фоном
- Текущая страница имеет белый фон с границей
- Разделители в виде серых точек
- Hover-эффекты для интерактивных элементов
