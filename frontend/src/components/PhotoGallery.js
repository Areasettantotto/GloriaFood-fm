import { useState } from 'react'
import { motion } from 'framer-motion'

// Updated defaultImages array with 5 images
const defaultImages = [
  '/images/gallery/1.png',
  '/images/gallery/2.png',
  '/images/gallery/3.png',
  '/images/gallery/4.png',
  '/images/gallery/5.png',
]

// Variants can be preserved or simplified based on new layout
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const PhotoGallery = ({ images = defaultImages }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (img, index) => {
    setSelectedImage({
      src: img,
      title: `Immagine ${index + 1}`,
      description: `Descrizione per immagine ${index + 1}`,
    })
    setModalOpen(true)
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl px-6 mt-8">
        {/* New layout: Left big image and right 2x2 grid */}
        <div className="flex gap-4">
          {/* Big image on the left */}
          <motion.div
            className="group overflow-hidden rounded-lg w-1/2"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => handleImageClick(images[0], 0)}
          >
            <img
              src={images[0]}
              alt="Immagine grande"
              loading="lazy"
              className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125 group-hover:contrast-125"
            />
          </motion.div>
          {/* 2x2 grid with 4 small images on the right */}
          <motion.div
            className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {images.slice(1, 5).map((img, index) => (
              <motion.div
                key={index + 1}
                className="group overflow-hidden rounded-lg"
                variants={itemVariants}
                onClick={() => handleImageClick(img, index + 1)}
              >
                <img
                  src={img}
                  alt={`Immagine piccola ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125 group-hover:contrast-125"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal/Fancy Box */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-3xl w-full flex flex-col md:flex-row gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full md:w-1/2 object-cover aspect-square rounded"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-700">{selectedImage.description}</p>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 self-end px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallery
