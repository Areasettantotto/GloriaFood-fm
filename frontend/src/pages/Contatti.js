import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner'
import GlobalLoader from '../components/GlobalLoader'
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import OpeningHours from '../components/OpeningHours'
import { pageVariants, pageTransition } from '../config/motionConfig'

function Contatti() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bannerVideo = document.querySelector('#banner-video')
    if (bannerVideo) {
      const handleVideoLoad = () => setIsLoading(false)
      if (bannerVideo.readyState >= 3) {
        handleVideoLoad()
      } else {
        bannerVideo.addEventListener('loadeddata', handleVideoLoad)
        bannerVideo.addEventListener('error', handleVideoLoad)
      }
      return () => {
        bannerVideo.removeEventListener('loadeddata', handleVideoLoad)
        bannerVideo.removeEventListener('error', handleVideoLoad)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  return isLoading ? (
    <GlobalLoader />
  ) : (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <HelmetProvider>
        <Helmet>
          <title>{siteConfig.home_helmet_title} - Contatti</title>
          <meta name="description" content={siteConfig.payoff} />
        </Helmet>
      </HelmetProvider>

      <div className="relative w-full">
        <Banner mediaType="video" bannerHeight="100%" showLogo={false} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Hide title for mobile page */}
          <h1 className="hidden md:block text-5xl font-bold text-white mb-8">
            {siteConfig.contact_banner_title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4 md:w-auto md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center w-full mt-4 md:mt-0"
            >
              {/* Button 1: Call */}
              <div className="flex flex-col items-center justify-center text-secondary bg-gray-200 py-6 px-4 w-full">
                <FaPhone className="mb-2 text-5xl hover:scale-125 transition-transform duration-300" />
                <p className="mt-2 text-sm">
                  {siteConfig.contact_content_button_call}
                </p>
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-full py-6 px-4 bg-secondary text-white hover:bg-accent transition-all duration-300"
              >
                {siteConfig.contact_lable_button_call}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center w-full"
            >
              {/* Button 2: Mail send */}
              <div className="flex flex-col items-center justify-center text-secondary bg-gray-200 py-6 px-4 w-full">
                <FaEnvelope className="mb-2 text-5xl hover:scale-125 transition-transform duration-300" />
                <p className="mt-2 text-sm">
                  {siteConfig.contact_content_button_email}
                </p>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-full py-6 px-4 bg-secondary text-white hover:bg-accent transition-all duration-300"
              >
                {siteConfig.contact_lable_button_email}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-center w-full"
            >
              {/* Button 3: Whatsapp */}
              <div className="flex flex-col items-center justify-center text-secondary bg-gray-200 py-6 px-4 w-full">
                <FaWhatsapp className="mb-2 text-5xl hover:scale-125 transition-transform duration-300" />
                <p className="mt-2 text-sm">
                  {siteConfig.contact_content_button_whatsapp}
                </p>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                className="w-full py-6 px-4 bg-secondary text-white hover:bg-accent transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.contact_lable_button_whatsapp}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <ContactSection />
    </motion.div>
  )
}

// Separate component for the contact section
const ContactSection = () => {
  return (
    <div className="container mx-auto p-4">
      <p className="text-center mt-4">{siteConfig.payoff}</p>
      <h2 className="text-2xl font-bold text-center mt-12">
        {siteConfig.contact_opening_hours_title}
      </h2>
      <div className="text-center mt-4">
        <OpeningHours />
      </div>
    </div>
  )
}

export default Contatti
