import { useEffect } from 'react'

/**
 * Component to configure passive event listeners globally
 * This helps address Chrome's passive event listener warnings
 */
const PassiveEventHandler = () => {
  useEffect(() => {
    // Override the default touchmove behavior to be passive
    const handleTouchMove = () => {
      // Do nothing - just make it passive
    }

    const handleWheel = () => {
      // Do nothing - just make it passive
    }

    // Add passive listeners to prevent Chrome warnings
    const addPassiveListeners = () => {
      document.addEventListener('touchmove', handleTouchMove, { passive: true })
      document.addEventListener('wheel', handleWheel, { passive: true })
      document.addEventListener('touchstart', handleTouchMove, {
        passive: true,
      })
    }

    const removePassiveListeners = () => {
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      })
      document.removeEventListener('wheel', handleWheel, { passive: true })
      document.removeEventListener('touchstart', handleTouchMove, {
        passive: true,
      })
    }

    // Check if passive listeners are supported
    let supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true
          return true
        },
      })
      window.addEventListener('test', null, opts)
    } catch {
      // Passive not supported
    }

    if (supportsPassive) {
      addPassiveListeners()
    }

    return () => {
      if (supportsPassive) {
        removePassiveListeners()
      }
    }
  }, [])

  return null // This component doesn't render anything
}

export default PassiveEventHandler
