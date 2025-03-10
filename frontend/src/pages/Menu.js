import { useState, useEffect } from 'react'
import useSWR from 'swr'
import siteConfig from '../config/siteConfig.json'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner'
import MenuCard from '../components/MenuCard'
// import { Player } from '@lottiefiles/react-lottie-player'
// import GlobalLoader from '../components/GlobalLoader'

// Nuovo fetcher con try-catch
const fetcher = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Errore: ${response.status} - ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
}

const pageTransition = {
  duration: 0.5,
}

const Menu = () => {
  const {
    data: menu,
    error,
    isValidating,
    mutate,
  } = useSWR(
    'http://localhost:4000/api/menu',
    fetcher,
    { refreshInterval: 30000 }, // Polling ogni 30 secondi
  )
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Imposta la categoria selezionata iniziale
  useEffect(() => {
    if (menu && !selectedCategory) {
      setSelectedCategory(menu.categories[0]?.id)
    }
  }, [menu, selectedCategory])

  const handleCategoryClick = (categoryId) =>
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId))

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
            <title>Ristorante {siteConfig.name} - Menù</title>
            <meta name="description" content={siteConfig.payoff} />
          </Helmet>
        </HelmetProvider>

        {/* Banner Section */}
        <Banner
          mediaType="video"
          mediaSrc="videos/menu.mp4"
          bannerHeight="30%"
          title="Il nostro menù"
          showLogo={false}
        />

        {/* Menu Content */}
        <div className="container mx-auto p-4">
          {/* Category Tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex overflow-x-auto space-x-4">
              {menu?.categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 border-2 border-solid border-gray-300 rounded text-secondary
                  ${selectedCategory === category.id ? 'bg-accent text-white' : 'bg-white text-secondary'}
                  hover:bg-secondary hover:text-white transition-all duration-300`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Language Flag */}
            <div className="ml-4">
              <img
                src="/images/flags/en-flag.svg"
                alt="English"
                className="w-8 h-8 cursor-pointer App-logo"
                title="Switch to English"
                onClick={() => alert('Switching to English...')}
              />
            </div>
          </div>

          {/* Menu Items */}
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
    </>
  )
}

export default Menu
