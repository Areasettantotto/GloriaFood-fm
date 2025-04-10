import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner'
import GlobalLoader from '../components/GlobalLoader'
import CookieConsent from '../components/CookieConsent' // 👈 Importa il componente

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
}

const pageTransition = {
  duration: 0.5,
}

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
          mediaType="video"
          bannerHeight="100%"
          title={siteConfig.home_banner_title}
          description={siteConfig.home_banner_subtitle}
        />

        <div className="bg-gray-100 py-12">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">
              {siteConfig.home_helmet_title}
            </h2>
            <p className="mt-4 text-lg">{siteConfig.home_content_subtitle}</p>
          </div>

          <Gallery />
        </div>
      </motion.div>
      <CookieConsent /> {/* 👈 Mostra il componente alla fine */}
    </>
  )
}

// Photogallery
const Gallery = () => (
  <div className="container mx-auto max-w-4xl px-6 mt-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[
        '/images/home-pizza.png',
        '/images/home-pizza.png',
        '/images/home-pizza.png',
      ].map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Piatto ${index + 1}`}
          loading="lazy" // Abilita lazy loading
          className={`w-full h-auto object-cover rounded-lg ${
            index >= 3 ? 'shadow-md' : 'App-logo'
          }`}
        />
      ))}
    </div>
  </div>
)

export default Home
