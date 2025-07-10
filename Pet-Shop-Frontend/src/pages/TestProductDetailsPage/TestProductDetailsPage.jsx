import React from 'react'
import ProductDetails from '../../components/ProductDetails/ProductDetails'

const TestProductDetailsPage = () => {
  // Тестовые данные для проверки компонента
  const testProduct = {
    id: 'test-1',
    title: 'BELCANDO Mini Dog Food - Test Product',
    price: 35,
    discont_price: 23,
    image:
      'https://via.placeholder.com/500x400/FF6B6B/FFFFFF?text=Test+Product',
    description: `This is a test product to verify that the ProductDetails component works correctly. 
    Versatile selection: discover the culinary world for your little four-legged friend with 2 types of dry food and 6 types of wet food. 
    So there is something for every taste. High acceptance: our balanced formula is rich in essential nutrients, vitamins and minerals and is tailored to the needs of small dog breeds. 
    An all-round supply that leaves nothing to be desired. Dry food: Finest GF Lamb - easily digestible and a croquette coated with instant sauce for extra taste. 
    Finest Croc - rich in meat and with grape seed flour. Made in Germany: Our feed is manufactured under the strictest quality standards in Germany and contains no artificial additives.`,
  }

  const handleAddToCart = (productId, quantity) => {
    alert(`Test: Added ${quantity} items of product ${productId} to cart!`)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div
          style={{
            padding: '20px',
            backgroundColor: '#e7f3ff',
            margin: '20px 0',
            borderRadius: '8px',
            border: '1px solid #0066cc',
          }}
        >
          <h2>🧪 ProductDetails Test Page</h2>
          <p>This page tests the ProductDetails component with static data.</p>
        </div>

        <ProductDetails
          product={testProduct}
          loading={false}
          error={null}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}

export default TestProductDetailsPage
