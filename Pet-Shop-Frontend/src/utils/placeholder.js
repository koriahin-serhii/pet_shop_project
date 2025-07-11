// Utility for generating placeholder images

/**
 * Generates a placeholder image URL with fallback options
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display
 * @param {string} bgColor - Background color (hex without #)
 * @param {string} textColor - Text color (hex without #)
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderImage = (
  width = 300,
  height = 200,
  text = 'No Image',
  bgColor = 'F5F5F5',
  textColor = '999999'
) => {
  // List of placeholder services (in order of preference)
  const services = [
    `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`,
    `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`,
    `https://picsum.photos/${width}/${height}?grayscale&blur=1`, // Fallback to random image
  ]
  
  return services[0] // Return the primary service
}

/**
 * Generates a data URL for a simple placeholder image
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display
 * @returns {string} Data URL for placeholder image
 */
export const generateDataUrlPlaceholder = (width = 300, height = 200, text = 'No Image') => {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
            fill="#999999" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Get placeholder image with multiple fallback options
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display
 * @returns {string} Best available placeholder image URL
 */
export const getReliablePlaceholder = (width = 300, height = 200, text = 'No Image') => {
  // Use data URL to ensure it always works
  return generateDataUrlPlaceholder(width, height, text)
}
