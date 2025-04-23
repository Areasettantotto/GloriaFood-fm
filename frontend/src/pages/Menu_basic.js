import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json' // Importa il file JSON con le info dell'attività
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Menu = () => {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/menu')
        if (!response.ok) throw new Error('Failed to fetch menu')
        const data = await response.json()
        setMenu(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  if (loading) return <div>Loading menu...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Ristorante {siteConfig.name} - Menù</title>
          <meta name="description" content="{siteConfig.payoff}" />
        </Helmet>
      </HelmetProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menu.categories.map((category) => (
            <div key={category.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              {category.items.map((item) => (
                <div key={item.id} className="mb-2">
                  {/*{item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}*/}
                  <p className="font-medium">{item.name}</p>
                  {/*<p className="text-gray-600">{item.description}</p>*/}
                  <p className="text-gray-900">€ {item.price},00</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Menu
