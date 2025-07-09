import React, { useState, useEffect, useMemo } from 'react'
import styles from './SortingComponent.module.css'
import checkboxNormal from '../../assets/icons/checkbox-normal.svg'
import checkboxActive from '../../assets/icons/checkbox-active.svg'

const SORT_OPTIONS = {
  DEFAULT: 'default',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
}

const SortingComponent = ({
  products = [],
  onFilteredProductsChange,
  showDiscountFilter = true,
  className = '',
}) => {
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [showDiscounted, setShowDiscounted] = useState(false)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DEFAULT)

  // Мемоизированная функция фильтрации и сортировки
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Фильтрация по цене
    if (priceFrom !== '' || priceTo !== '') {
      filtered = filtered.filter((product) => {
        const price = product.discont_price || product.price
        const from = priceFrom === '' ? 0 : parseFloat(priceFrom)
        const to = priceTo === '' ? Infinity : parseFloat(priceTo)

        return price >= from && price <= to
      })
    }

    // Фильтрация по скидке (только если включен чекбокс)
    if (showDiscounted && showDiscountFilter) {
      filtered = filtered.filter((product) => product.discont_price !== null)
    }

    // Сортировка
    switch (sortBy) {
      case SORT_OPTIONS.PRICE_ASC:
        filtered.sort((a, b) => {
          const priceA = a.discont_price || a.price
          const priceB = b.discont_price || b.price
          return priceA - priceB
        })
        break
      case SORT_OPTIONS.PRICE_DESC:
        filtered.sort((a, b) => {
          const priceA = a.discont_price || a.price
          const priceB = b.discont_price || b.price
          return priceB - priceA
        })
        break
      default:
        // Оставляем порядок по умолчанию (как пришел с сервера)
        break
    }

    return filtered
  }, [products, priceFrom, priceTo, showDiscounted, sortBy, showDiscountFilter])

  // Отправляем отфильтрованные товары наверх при изменении
  useEffect(() => {
    if (onFilteredProductsChange) {
      onFilteredProductsChange(filteredAndSortedProducts)
    }
  }, [filteredAndSortedProducts, onFilteredProductsChange])

  const handlePriceFromChange = (e) => {
    const value = e.target.value
    if (value === '' || parseFloat(value) >= 0) {
      setPriceFrom(value)
    }
  }

  const handlePriceToChange = (e) => {
    const value = e.target.value
    if (value === '' || parseFloat(value) >= 0) {
      setPriceTo(value)
    }
  }

  const handleClearFilters = () => {
    setPriceFrom('')
    setPriceTo('')
    setShowDiscounted(false)
    setSortBy(SORT_OPTIONS.DEFAULT)
  }

  const hasActiveFilters =
    priceFrom !== '' ||
    priceTo !== '' ||
    showDiscounted ||
    sortBy !== SORT_OPTIONS.DEFAULT

  return (
    <div className={`${styles.sortingComponent} ${className}`}>
      {/* Фильтр по цене */}
      <div className={styles.priceFilter}>
        <label className={styles.label}>Price</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="from"
            value={priceFrom}
            onChange={handlePriceFromChange}
            className={styles.priceInput}
            min="0"
          />
          <span className={styles.priceSeparator}>-</span>
          <input
            type="number"
            placeholder="to"
            value={priceTo}
            onChange={handlePriceToChange}
            className={styles.priceInput}
            min="0"
          />
        </div>
      </div>

      {/* Чекбокс для товаров со скидкой (только если showDiscountFilter === true) */}
      {showDiscountFilter && (
        <div className={styles.checkboxContainer}>
          <label className={styles.label}>Discounted items</label>
          <div
            className={styles.customCheckbox}
            onClick={() => setShowDiscounted(!showDiscounted)}
          >
            <img
              src={showDiscounted ? checkboxActive : checkboxNormal}
              alt={showDiscounted ? 'Checked' : 'Unchecked'}
              className={styles.checkboxIcon}
            />
          </div>
        </div>
      )}

      {/* Сортировка */}
      <div className={styles.sortContainer}>
        <label className={styles.label}>Sorted</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value={SORT_OPTIONS.DEFAULT}>by default</option>
          <option value={SORT_OPTIONS.PRICE_ASC}>price: low to high</option>
          <option value={SORT_OPTIONS.PRICE_DESC}>price: high to low</option>
        </select>
      </div>

      {/* Счетчик результатов и кнопка очистки */}
      <div className={styles.resultsSection}>
        <div className={styles.resultsCount}>
          {filteredAndSortedProducts.length} items
        </div>
        {hasActiveFilters && (
          <button onClick={handleClearFilters} className={styles.clearButton}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export default SortingComponent
