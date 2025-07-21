import { useState, useEffect } from 'react'
import moment from 'moment'
import useSWR from 'swr'
import siteConfig from '../config/siteConfig.json'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
// import { FaShoppingCart } from 'react-icons/fa'
import Banner from '../components/Banner'
import MenuCard from '../components/MenuCard'
import backendUrl from '../config/config.js'
import { pageVariants, pageTransition } from '../config/motionConfig'

const apiEndpoint = `${backendUrl}/api/menu`

// Debug: Print the URL used
// console.log('Backend URL:', backendUrl)

const fetcher = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Errore: ${response.status} - ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error('Errore fetcher:', error)
    throw error
  }
}

const Menu = () => {
  const {
    data: menu,
    error,
    isValidating,
    mutate,
  } = useSWR(apiEndpoint, fetcher, {
    refreshInterval: 30000,
  })

  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    if (menu) {
      const firstVisibleCategory = menu.categories.find(
        (category) =>
          category.active &&
          (!category.hidden_until || moment().isAfter(category.hidden_until)),
      )

      const isCurrentValid = menu.categories.some(
        (category) =>
          category.id === selectedCategory &&
          category.active &&
          (!category.hidden_until || moment().isAfter(category.hidden_until)),
      )

      if (!isCurrentValid) {
        setSelectedCategory(firstVisibleCategory?.id)
      }
    }
  }, [menu, selectedCategory])

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  if (isValidating && !menu) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="loader"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 font-semibold text-lg">
          Si è verificato un errore: {error.message}
        </p>
        <button
          onClick={() => mutate()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Riprova
        </button>
      </div>
    )
  }

  const selectedCategoryData = menu?.categories.find(
    (category) => category.id === selectedCategory,
  )

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <HelmetProvider>
        <Helmet>
          <title>{siteConfig.home_helmet_title} - Menù</title>
          <meta name="description" content={siteConfig.payoff} />
        </Helmet>
      </HelmetProvider>

      <Banner
        mediaType="video"
        mediaSrc="videos/menu.mp4"
        bannerHeight="30%"
        title={siteConfig.menu_banner_title}
        showLogo={false}
      />

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex overflow-x-auto space-x-4">
            {menu?.categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 border-2 border-gray-300 rounded text-secondary
                ${selectedCategory === category.id ? 'bg-accent text-white' : 'bg-white text-secondary'}
                hover:bg-secondary hover:text-white transition-all duration-300`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="ml-4">
            {/* <FaShoppingCart
              className="text-2xl text-gray-500 cursor-pointer"
              title="Carrello"
              onClick={() => alert('Apertura carrello...')}
            /> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCategoryData &&
            selectedCategoryData.items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                showImage={siteConfig.view_menu_image}
              />
            ))}
        </div>
      </div>

      <div className="h-12" />
    </motion.div>
  )
}

export default Menu
