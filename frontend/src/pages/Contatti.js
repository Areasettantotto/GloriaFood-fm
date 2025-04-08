import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json' // Info ristorante
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
    const bannerVideo = document.querySelector('video')
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

      {/* Banner con overlay per i pulsanti centrati */}
      <div className="relative w-full">
        <Banner mediaType="video" bannerHeight="100%" showLogo={false} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-white mb-8">Contatti</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pulsante 1 */}
            <div className="flex flex-col items-center w-full">
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
            </div>
            {/* Pulsante 2 */}
            <div className="flex flex-col items-center w-full">
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
            </div>
            {/* Pulsante 3 */}
            <div className="flex flex-col items-center w-full">
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
            </div>
          </div>
        </div>
      </div>

      {/* Contenuto della pagina (pulsanti rimossi) */}
      <ContactSection />
    </motion.div>
  )
}

// Componente separato per la sezione contatti
const ContactSection = () => {
  const allDaysSameHours = siteConfig.contact_opening_hours.every(
    (day) => day.hours === siteConfig.contact_opening_hours[0].hours,
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">
        {siteConfig.home_helmet_title}
      </h1>
      <p className="text-center mt-4">{siteConfig.payoff}</p>
      <h2 className="text-2xl font-bold text-center mt-12">
        {siteConfig.contact_opening_hours_title}
      </h2>
      <div className="text-center mt-4">
        {allDaysSameHours ? (
          <p className="text-sm">
            Aperto tutti i giorni dalle:{' '}
            {siteConfig.contact_opening_hours[0].hours}
          </p>
        ) : (
          <table className="table-auto mx-auto">
            <tbody>
              {siteConfig.contact_opening_hours.map((day, index) => (
                <tr key={index} className="text-sm">
                  <td className="text-left pr-4">{day.day}</td>
                  <td className="text-right">{day.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Contatti
