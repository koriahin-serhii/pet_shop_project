import React from 'react'
import Modal from '../Modal/Modal'
import styles from './OrderSuccessModal.module.css'

const OrderSuccessModal = ({ isOpen, onClose }) => {
  // Inline стили для гарантии правильного отображения
  const containerStyle = {
    backgroundColor: '#0d50ff',
    color: 'white',
    padding: '32px',
    borderRadius: '8px',
    textAlign: 'left',
    maxWidth: '550px',
    maxHeight: '240px',
    lineHeight: '1.5',
    minHeight: '120px',
    position: 'relative'
  }

  const titleStyle = {
    fontSize: '40px',
    fontWeight: '600',
    color: 'white',
    margin: '0 0 16px 0'
  }

  const textStyle = {
    fontSize: '20px',
    color: 'white',
    lineHeight: '1.4',
    fontWeight: '400'
  }

  const closeButtonStyle = {
    position: 'absolute',
    top: '24px',
    right: '24px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '60px',
    cursor: 'pointer',
    padding: '0',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
      <div className={styles.container} style={containerStyle}>
        <button 
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className={styles.title} style={titleStyle}>
          Congratulations!
        </h2>
        <p className={styles.message} style={{...textStyle, margin: '0 0 8px 0'}}>
          Your order has been successfully placed<br />
          on the website.
        </p>
        <p className={styles.subMessage} style={{...textStyle, margin: '0'}}>
          A manager will contact you shortly<br />
          to confirm your order.
        </p>
      </div>
    </Modal>
  )
}

export default OrderSuccessModal