import { useState } from 'react'
import {
  FaUtensils,
  FaAllergies,
  FaHeartbeat,
  FaFlask,
  FaFire,
  FaLeaf,
  FaSeedling,
} from 'react-icons/fa'
import moment from 'moment'

const MenuCard = ({ item, showImage = true }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false) // Stato per il caricamento immagine
  const [activeSection, setActiveSection] = useState(null)

  const TAG_PROPERTIES = {
    hot: { label: 'Piccante', className: 'bg-red-500' },
    vegan: { label: 'Vegano', className: 'bg-green-500' },
    vegetarian: { label: 'Vegetariano', className: 'bg-green-500' },
    gluten_free: { label: 'Senza Glutine', className: 'bg-yellow-500' },
    halal: { label: 'Halal', className: 'bg-green-500' },
    dairy_free: { label: 'Senza Lattosio', className: 'bg-yellow-500' },
    raw: { label: 'Crudo', className: 'bg-red-500' },
    nut_free: { label: 'Senza Frutta a Guscio', className: 'bg-yellow-500' },
    default: { label: 'Altro', className: 'bg-gray-500' },
  }

  const TAG_ICONS = {
    hot: <FaFire className="inline mr-1" />,
    vegan: <FaLeaf className="inline mr-1" />,
    vegetarian: <FaSeedling className="inline mr-1" />,
    gluten_free: <FaAllergies className="inline mr-1" />,
    halal: <FaHeartbeat className="inline mr-1" />,
    dairy_free: <FaFlask className="inline mr-1" />,
    raw: <FaUtensils className="inline mr-1" />,
    nut_free: <FaLeaf className="inline mr-1" />,
    default: <FaUtensils className="inline mr-1" />,
  }

  // Determina se l'articolo è "esaurito" in base alla data
  const isOutOfStock = () => {
    if (item.out_of_stock) return true

    if (item.out_of_stock_next_day) {
      return moment().isBefore(moment(item.out_of_stock_next_day))
    }

    if (item.out_of_stock_until) {
      return moment().isBefore(moment(item.out_of_stock_until))
    }

    return false
  }

  const outOfStock = isOutOfStock()

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section))
  }

  return (
    <div
      key={item.id}
      className="relative border p-4 rounded-lg shadow-lg overflow-hidden bg-white"
    >
      {/* Gestione immagine */}
      {showImage && (
        <div className="relative group rounded-lg overflow-hidden">
          {!imageError && item.image ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-64 object-cover rounded-lg mb-2 transition-transform duration-300 ${
                  imageLoaded && !outOfStock
                    ? 'group-hover:scale-110 group-hover:brightness-125 group-hover:contrast-125'
                    : ''
                } ${outOfStock ? 'filter grayscale-[50%] opacity-50' : ''}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-center rounded-lg mb-2">
              Nessuna immagine disponibile. Carica un file così nominato{' '}
              {item.id}
              .jpg.
            </div>
          )}
        </div>
      )}

      {/* Badge "ESAURITO" */}
      {outOfStock && (
        <span className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
          ESAURITO
        </span>
      )}

      {/* Dati principali */}
      <p className="font-medium mt-2 text-lg">{item.name}</p>
      <p className="text-gray-500 mt-2 font-semibold">€ {item.price},00</p>
      <hr className="mt-4 border-gray-300" />

      {/* Tag Badge */}
      {item.tags && item.tags.length > 0 && (
        <div className="absolute top-6 right-6 flex flex-wrap gap-1 max-w-full z-10">
          {item.tags.map((tag, index) => {
            const tagKey = tag.toLowerCase()
            const { label, className } =
              TAG_PROPERTIES[tagKey] || TAG_PROPERTIES.default
            const Icon = TAG_ICONS[tagKey] || TAG_ICONS.default
            return (
              <span
                key={index}
                className={`flex items-center text-white text-xs font-bold py-1 px-2 rounded ${className}`}
              >
                {Icon} {label}
              </span>
            )
          })}
        </div>
      )}

      {/* Icone per mostrare dettagli */}
      <div className="flex items-center space-x-4 mt-4">
        {item.ingredients && (
          <button
            onClick={() => toggleSection('ingredients')}
            className={`flex items-center transition-transform duration-300 ${
              activeSection === 'ingredients'
                ? 'scale-125 text-accent'
                : 'scale-100 text-gray-500'
            }`}
          >
            <FaUtensils className="text-2xl" title="Ingredienti" />
          </button>
        )}
        {item.allergens?.length > 0 && (
          <button
            onClick={() => toggleSection('allergens')}
            className={`flex items-center transition-transform duration-300 ${
              activeSection === 'allergens'
                ? 'scale-125 text-accent'
                : 'scale-100 text-gray-500'
            }`}
          >
            <FaAllergies className="text-2xl" title="Allergeni" />
          </button>
        )}
        {item.nutritionalValues?.length > 0 && (
          <button
            onClick={() => toggleSection('nutritionalValues')}
            className={`flex items-center transition-transform duration-300 ${
              activeSection === 'nutritionalValues'
                ? 'scale-125 text-accent'
                : 'scale-100 text-gray-500'
            }`}
          >
            <FaHeartbeat className="text-2xl" title="Valori Nutrizionali" />
          </button>
        )}
        {item.additives && (
          <button
            onClick={() => toggleSection('additives')}
            className={`flex items-center transition-transform duration-300 ${
              activeSection === 'additives'
                ? 'scale-125 text-accent'
                : 'scale-100 text-gray-500'
            }`}
          >
            <FaFlask className="text-2xl" title="Additivi" />
          </button>
        )}
      </div>

      {/* Sezioni dettagli */}
      {activeSection === 'ingredients' && item.ingredients && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Ingredienti:</strong> {item.ingredients}
          </p>
        </div>
      )}

      {activeSection === 'allergens' && item.allergens && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Allergeni:</strong> {item.allergens.join(', ')}
          </p>
        </div>
      )}

      {activeSection === 'nutritionalValues' && item.nutritionalValues && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">
            Valori nutrizionali in grammi ({item.nutritionalSizeLabel}):
          </p>
          <table className="w-full text-sm text-gray-700 border-collapse border-spacing-y-2">
            <tbody>
              {item.nutritionalValues.map((nv, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="pr-4 font-medium">{nv.name}</td>
                  <td className="text-right">{nv.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'additives' && item.additives && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Additivi:</strong> {item.additives}
          </p>
        </div>
      )}
    </div>
  )
}

export default MenuCard
