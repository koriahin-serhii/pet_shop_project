import React from 'react'
import instagramIcon from '../../assets/icons/ic-instagram.svg'
import whatsappIcon from '../../assets/icons/ic-whatsapp.svg'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h3 className={styles.title}>Contact</h3>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <h4>Phone</h4>
                <p>+49 30 915-88492</p>
              </div>
              <div className={styles.contactItem}>
                <h4>Socials</h4>
                <div className={styles.socials}>
                  <a href="#" className={styles.socialLink}>
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src={whatsappIcon} alt="WhatsApp" />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <h4>Address</h4>
                <p>Wallstraße 9-13, 10179 Berlin, Deutschland</p>
              </div>
              <div className={styles.contactItem}>
                <h4>Working Hours</h4>
                <p>24 hours a day</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2764.372718069592!2d13.402821400376967!3d52.510456572506776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27dade5561%3A0x2454d91ffab308fa!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1751894698139!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IT Career Hub"
                aria-label="IT Career Hub"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
