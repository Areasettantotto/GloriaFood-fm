import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json' // Info attività
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner' // Banner importato
import GlobalLoader from '../components/GlobalLoader' // Importa il loader globale

// Transizioni della pagina
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
    // Simula il caricamento delle risorse principali
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
        img.addEventListener('error', handleImageLoad) // In caso di errore, continua
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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <HelmetProvider>
        <Helmet>
          <title>Ristorante {siteConfig.name} - Homepage</title>
          <meta name="description" content={siteConfig.payoff} />
        </Helmet>
      </HelmetProvider>

      {/* Componente Banner */}
      <Banner
        mediaType="video" // 'image', 'video' o 'lottie'
        bannerHeight="100%"
        title={`Benvenuti ${siteConfig.name}`}
        description={siteConfig.payoff}
      />

      {/* Sezione contenuto */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold">
            Bar Ristorante {siteConfig.name}
          </h2>
          <p className="mt-4 text-lg">
            Esplora alcune delle nostre specialità e piatti preparati con
            passione.
          </p>
        </div>

        {/* Gallery */}
        <Gallery />
      </div>
    </motion.div>
  )
}

// Componente Gallery (estratto per modularità)
const Gallery = () => (
  <div className="container mx-auto max-w-4xl px-6 mt-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[
        '/images/home-pizza.png',
        '/images/home-pizza.png',
        '/images/home-pizza.png',
        '/images/home-pizza-background.png',
        '/images/home-pizza-background.png',
        '/images/home-pizza-background.png',
      ].map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Piatto ${index + 1}`}
          className={`w-full h-auto object-cover rounded-lg ${
            index >= 3 ? 'shadow-md' : 'App-logo'
          }`}
        />
      ))}
    </div>
  </div>
)

export default Home
