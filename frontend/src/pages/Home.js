import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json'
import { pageVariants, pageTransition } from '../config/motionConfig'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner'
import GlobalLoader from '../components/GlobalLoader'
import CookieConsent from '../components/CookieConsent'
import PhotoGallery from '../components/PhotoGallery'

function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const images = document.querySelectorAll('img')
    let loaded = 0

    const handleImageLoad = () => {
      loaded += 1
      if (loaded === images.length) {
        setIsLoading(false)
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad()
      } else {
        img.addEventListener('load', handleImageLoad)
        img.addEventListener('error', handleImageLoad)
      }
    })

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad)
        img.removeEventListener('error', handleImageLoad)
      })
    }
  }, [])

  return isLoading ? (
    <GlobalLoader />
  ) : (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <HelmetProvider>
          <Helmet>
            <title>{siteConfig.home_helmet_title}</title>
            <meta name="description" content={siteConfig.home_helmet_payoff} />
          </Helmet>
        </HelmetProvider>

        <Banner
          mediaType="video" // video, image, or lottie
          bannerHeight="100%"
          title={siteConfig.home_banner_title}
          description={siteConfig.home_banner_subtitle}
        />

        <div className="bg-gray-100 py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto max-w-4xl px-6 text-left">
              <h2 className="text-3xl font-semibold">
                {siteConfig.home_helmet_title}
              </h2>
              <p className="mt-4 text-lg">{siteConfig.home_content_subtitle}</p>
            </div>
          </motion.div>
          <PhotoGallery />
        </div>
      </motion.div>
      <CookieConsent />
    </>
  )
}

export default Home
