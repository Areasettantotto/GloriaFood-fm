import siteConfig from '../config/siteConfig.json'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner'

// Transitions config
const pageVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
}

const pageTransition = {
  duration: 0.5,
}

function NotFound() {
  return (
    <HelmetProvider>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Banner
          mediaType="video"
          mediaSrc="videos/ProvacyPolicy.mp4"
          bannerHeight="30%"
          title="Pagina non trovata"
          showLogo={false}
        />
        <Helmet>
          <title>Ristorante {siteConfig.name} - 404</title>
          <meta name="description" content="{siteConfig.payoff}" />
        </Helmet>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center">404</h1>
          <p className="text-center mt-4">Pagina non trovata.</p>
        </div>
      </motion.div>
    </HelmetProvider>
  )
}

export default NotFound
