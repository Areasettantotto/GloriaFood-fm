import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json' // Info attività
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner' // Banner component
import GlobalLoader from '../components/GlobalLoader' // Loader globale
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa' // Importa le icone

// Transizioni pagina
const pageVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
}

const pageTransition = {
  duration: 0.5,
}

function Contatti() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Gestione caricamento dinamico delle risorse
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
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <HelmetProvider>
        <Helmet>
          <title>Ristorante {siteConfig.name} - Contatti</title>
          <meta name="description" content={siteConfig.payoff} />
        </Helmet>
      </HelmetProvider>

      {/* Sezione Banner */}
      <Banner
        mediaType="video" // Può essere 'image', 'video' o 'lottie'
        bannerHeight="30%"
        title="Contatti"
        showLogo={false} // Escludi il logo
      />

      {/* Contenuto della pagina */}
      <ContactSection />
    </motion.div>
  )
}

// Componente separato per la sezione contatti
const ContactSection = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center">{siteConfig.name}</h1>
    <p className="text-center mt-4">{siteConfig.payoff}</p>
    {/* Aggiungi una riga con tre colonne per i pulsanti */}
    <div className="mt-6 text-center grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center justify-center text-secondary bg-gray-200 py-6 px-4 rounded w-full">
          <FaPhone className="mb-2 text-5xl hover:scale-125 transition-transform duration-300" />
          <p className="mt-2 text-sm">
            Siamo aperti dalle ore 06:00 alle ore 24:00
          </p>
        </div>
        <a
          href={`tel:${siteConfig.phone}`}
          className="w-full py-6 px-4 bg-secondary text-white rounded-b hover:bg-accent transition-all duration-300"
        >
          Chiamaci
        </a>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center justify-center text-secondary bg-gray-200 py-6 px-4 rounded w-full">
          <FaEnvelope className="mb-2 text-5xl hover:scale-125 transition-transform duration-300" />
          <p className="mt-2 text-sm">Rispondiamo entro 24 ore</p>
        </div>
        <a
          href={`mailto:${siteConfig.email}`}
          className="w-full py-6 px-4 bg-secondary text-white rounded-b hover:bg-accent transition-all duration-300"
        >
          Invia una mail
        </a>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center justify-center text-secondary bg-gray-200 py-6 px-4 rounded w-full">
          <FaWhatsapp className="mb-2 text-5xl hover:scale-125 transition-transform duration-300" />
          <p className="mt-2 text-sm">Disponibile 24/7</p>
        </div>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          className="w-full py-6 px-4 bg-secondary text-white rounded-b hover:bg-accent transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contattaci su WhatsApp
        </a>
      </div>
    </div>
    {/* Aggiungi una riga di testo sotto i pulsanti */}
    <h2 className="text-2xl font-bold text-center mt-12">Contattaci</h2>
    <p className="text-center mt-4">
      Siamo qui per aiutarti con qualsiasi domanda o richiesta.
    </p>
  </div>
)

export default Contatti
