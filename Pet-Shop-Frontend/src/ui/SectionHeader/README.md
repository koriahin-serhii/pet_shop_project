# SectionHeader

Универсальный компонент для создания заголовков секций с опциональными ссылками.

## Особенности

- 🎯 **Универсальность** - подходит для заголовков Categories, Sale, Shopping cart и других секций
- 🔗 **Опциональная ссылка** - можно добавить или убрать ссылку справа от заголовка
- 📱 **Responsive дизайн** - адаптируется под разные размеры экрана
- 🎨 **Кастомизация** - поддержка дополнительных CSS классов
- ♿ **Accessibility** - семантически корректные HTML теги

## Использование

### Базовый пример
```jsx
import { SectionHeader } from '../../ui'

<SectionHeader title="Categories" />
```

### С ссылкой
```jsx
<SectionHeader 
  title="Categories" 
  linkText="All categories"
  linkTo="/categories"
/>
```

### С кастомным тегом заголовка
```jsx
<SectionHeader 
  title="Main Categories" 
  titleTag="h1"
  linkText="View all"
  linkTo="/categories"
/>
```

## Props

| Prop | Тип | По умолчанию | Обязательный | Описание |
|------|-----|--------------|--------------|----------|
| `title` | `string` | - | ✅ | Текст заголовка |
| `linkText` | `string` | - | ❌ | Текст ссылки (если нужна) |
| `linkTo` | `string` | - | ❌ | URL для ссылки |
| `className` | `string` | `''` | ❌ | Дополнительные CSS классы |
| `titleTag` | `string` | `'h2'` | ❌ | HTML тег для заголовка (`h1`, `h2`, `h3`, etc.) |

## Примеры использования в проекте

### Categories секция
```jsx
<SectionHeader 
  title="Categories" 
  linkText="All categories"
  linkTo={ROUTES.CATEGORIES}
/>
```

### Sale секция
```jsx
<SectionHeader 
  title="Sale" 
  linkText="All sales"
  linkTo={ROUTES.ALL_SALES}
/>
```

### Shopping cart страница
```jsx
<SectionHeader 
  title="Shopping cart" 
  linkText="Back to the store"
  linkTo={ROUTES.MAIN}
/>
```

## Стили

Компонент использует CSS модули с адаптивным дизайном:

- **Desktop**: заголовок 64px, ссылка справа
- **Tablet (≤768px)**: вертикальная компоновка, заголовок 36px
- **Mobile (≤480px)**: заголовок 28px, компактная ссылка

## Замененные компоненты

Этот компонент заменяет дублирующийся код заголовков в:
- `src/components/Categories/Categories.jsx`
- `src/components/DiscountProducts/DiscountProducts.jsx`
- `src/pages/ShoppingCartPage/ShoppingCartPage.jsx`
