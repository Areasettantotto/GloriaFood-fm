import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import siteConfig from '../config/siteConfig.json'

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)
  const [reopen, setReopen] = useState(false)
  const [lang, setLang] = useState('it')
  const [overFooter, setOverFooter] = useState(false)

  const buttonRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'it'
    setLang(browserLang)

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const now = new Date().getTime()

        if (parsed.expiresAt && now < parsed.expiresAt) {
          setReopen(true)
          return
        } else {
          localStorage.removeItem('cookie_consent') // Expired
        }
      } catch {
        localStorage.removeItem('cookie_consent') // Errat format
      }
    }

    setVisible(true)
  }, [])

  useEffect(() => {
    const checkOverlap = () => {
      const btn = buttonRef.current
      const footer = document.querySelector('footer')
      if (!btn || !footer) return
      const btnRect = btn.getBoundingClientRect()
      const footerRect = footer.getBoundingClientRect()
      const isOverlapping = !(
        btnRect.right < footerRect.left ||
        btnRect.left > footerRect.right ||
        btnRect.bottom < footerRect.top ||
        btnRect.top > footerRect.bottom
      )
      setOverFooter(isOverlapping)
    }
    window.addEventListener('scroll', checkOverlap)
    window.addEventListener('resize', checkOverlap)
    checkOverlap()
    return () => {
      window.removeEventListener('scroll', checkOverlap)
      window.removeEventListener('resize', checkOverlap)
    }
  }, [])

  const handleConsent = (accepted) => {
    const expirationDays = 1 // Consent expiration days
    const expiresAt =
      new Date().getTime() + expirationDays * 24 * 60 * 60 * 1000

    const consentData = {
      value: accepted ? 'accepted' : 'declined',
      expiresAt,
    }

    localStorage.setItem('cookie_consent', JSON.stringify(consentData))
    setVisible(false)
    setReopen(true)
  }

  // Makes the consent widget visible
  const toggleWidget = () => setVisible(true)

  // Messages by language from siteConfig
  const t = siteConfig.cookie_consent_messages[lang]

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 md:right-auto bg-white border border-gray-300 shadow-xl p-4 rounded-2xl max-w-xl mx-auto z-50 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 text-sm text-gray-800">
              {t.message}{' '}
              <Link
                to="/Privacy-policy"
                className="text-blue-600 hover:underline"
              >
                {t.privacyLink}
              </Link>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleConsent(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {t.accept}
              </button>
              <button
                onClick={() => handleConsent(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                {t.decline}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button to reopen the privacy/policy widget */}
      {reopen && !visible && (
        <button
          ref={buttonRef}
          onClick={toggleWidget}
          style={{
            bottom: overFooter ? '80px' : '16px',
            transition: 'bottom 0.3s ease',
          }} // Add transition for smooth effect
          className="fixed left-4 z-40 text-white text-sm px-4 py-2 rounded-full shadow-md bg-primary hover:bg-primary/90"
          aria-label="Ri-apri preferenze privacy"
        >
          {t.reopen}
        </button>
      )}
    </>
  )
}

export default CookieConsent
