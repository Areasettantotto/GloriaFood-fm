// src/utils/motionConfig.js
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from './motionConfig' // Importa le configurazioni

function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <h1>Benvenuto nella Homepage</h1>
      <p>Scopri il nostro menu e contattaci per maggiori informazioni!</p>
    </motion.div>
  )
}

export default Home
