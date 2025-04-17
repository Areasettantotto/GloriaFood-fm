import { motion } from 'framer-motion'
import siteConfig from '../config/siteConfig.json'

const OpeningHours = () => {
  const allDaysSameHours = siteConfig.contact_opening_hours.every(
    (day) => day.hours === siteConfig.contact_opening_hours[0].hours,
  )

  // New animation variants with spring scaling effect
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return allDaysSameHours ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-r from-secondary to-accent p-6 rounded-lg shadow-lg text-white text-center"
    >
      <motion.p variants={itemVariants} className="text-xl font-semibold">
        {siteConfig.contact_open_all_days}{' '}
        {siteConfig.contact_opening_hours[0].hours}
      </motion.p>
    </motion.div>
  ) : (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <motion.table className="w-full" variants={containerVariants}>
        <tbody>
          {siteConfig.contact_opening_hours.map((day, index) => (
            <motion.tr
              key={index}
              variants={itemVariants}
              className="border-b last:border-0 border-gray-200"
            >
              <td className="px-4 py-2 font-medium text-gray-700">{day.day}</td>
              <td className="px-4 py-2 text-gray-900">{day.hours}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  )
}

export default OpeningHours
