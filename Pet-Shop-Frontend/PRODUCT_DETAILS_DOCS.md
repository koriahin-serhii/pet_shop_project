# ProductDetails Component Documentation

## Overview
The ProductDetails component displays comprehensive information about a product, including image, title, pricing, description, and shopping cart integration.

## Features
- **Product Information Display**: Shows title, image, price, and description
- **Discount Support**: Displays original price, discounted price, and discount percentage
- **Interactive Description**: "Read more/Read less" functionality for long descriptions
- **Shopping Cart Integration**: QuickCounter component for adding items to cart
- **Loading States**: Handles loading, error, and no-product states
- **Responsive Design**: Adapts to different screen sizes

## Props
- `product` (object): Product data containing id, title, price, discont_price, image, description
- `loading` (boolean): Loading state indicator
- `error` (string|null): Error message if any
- `onAddToCart` (function): Callback function for adding items to cart

## Usage Example
```jsx
import ProductDetails from './components/ProductDetails/ProductDetails'

const ProductPage = () => {
  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity }))
    alert('Added to cart!')
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

## Product Data Structure
```javascript
{
  id: 1,
  title: "BELCANDO Mini Dog Food",
  price: 35,
  discont_price: 23, // null if no discount
  image: "/product_img/1.jpeg",
  description: "Product description text..."
}
```

## Integration with Redux
The component integrates with:
- **Products Slice**: For fetching product data
- **Cart Slice**: For adding items to shopping cart

## Routing
- URL pattern: `/products/:id`
- Automatically fetches product data based on URL parameter
- Handles invalid product IDs gracefully

## Styling
- Uses CSS Modules for styling
- Responsive design with breakpoints
- Modern UI with shadows, gradients, and transitions
- Accessible design with proper ARIA labels

## Dependencies
- React Hooks (useState)
- QuickCounter component
- Redux for state management
- React Router for navigation
