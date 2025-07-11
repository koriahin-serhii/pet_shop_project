// Utility for managing event listeners with passive options

/**
 * Add an event listener with proper passive options
 * @param {Element} element - The element to add the listener to
 * @param {string} event - The event type
 * @param {Function} handler - The event handler
 * @param {boolean} passive - Whether the listener should be passive
 * @returns {Function} Cleanup function to remove the listener
 */
export const addPassiveEventListener = (
  element,
  event,
  handler,
  passive = true
) => {
  const options = { passive }
  element.addEventListener(event, handler, options)

  return () => {
    element.removeEventListener(event, handler, options)
  }
}

/**
 * Check if passive event listeners are supported
 * @returns {boolean} Whether passive listeners are supported
 */
export const supportsPassive = (() => {
  let supported = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true
        return true
      },
    })
    window.addEventListener('test', null, opts)
  } catch {
    // Passive listeners not supported
  }
  return supported
})()

/**
 * Get appropriate event listener options
 * @param {boolean} passive - Whether to use passive
 * @returns {boolean|object} Options object or boolean for older browsers
 */
export const getEventOptions = (passive = true) => {
  return supportsPassive ? { passive } : false
}
