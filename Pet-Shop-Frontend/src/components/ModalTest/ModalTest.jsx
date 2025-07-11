import React, { useState } from 'react'
import { OrderSuccessModal, CustomButton } from '../../ui'
import styles from './ModalTest.module.css'

const ModalTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleGoHome = () => {
    console.log('Going home...')
  }

  return (
    <div className={styles.container}>
      <h2>Modal Test</h2>
      <CustomButton onClick={handleOpenModal}>
        Test Order Success Modal
      </CustomButton>

      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onGoHome={handleGoHome}
      />
    </div>
  )
}

export default ModalTest
