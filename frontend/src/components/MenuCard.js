import { useState, useEffect } from 'react'
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
import nutritionalMapping from '../config/nutritionalMapping'

const MenuCard = ({ item, showImage = true }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [selectedSize, setSelectedSize] = useState(
    item.sizes ? item.sizes.find((size) => size.default) || null : null,
  )
  // Coerce extras into an array
  const extrasArray = Array.isArray(item.extras) ? item.extras : []
  const [_selectedExtras] = useState(
    extrasArray.filter((extra) => extra.default === true),
  )

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

  const AnimatedTrafficLight = ({
    title,
    className = '',
    selected = false,
  }) => {
    const [active, setActive] = useState(0)
    useEffect(() => {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % 3)
      }, 400)
      return () => clearInterval(interval)
    }, [])
    return (
      <div
        title={title}
        className={`flex flex-col justify-center items-center ${className} space-y-1`}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-[25px] h-1 transition-opacity duration-200 ${
              selected && active === index ? 'bg-accent' : 'bg-gray-500'
            }`}
            style={{ opacity: active === index ? 1 : 0.3 }}
          ></div>
        ))}
      </div>
    )
  }

  // Determine if the item is "out of stock" based on the date
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

  const displayPrice = selectedSize
    ? item.price + selectedSize.price
    : item.price

  // Calculate nutritional values based on the selected measurement
  const computeNutrition = () => {
    if (
      selectedSize &&
      selectedSize.extras &&
      selectedSize.extras.menu_item_nutritional_values &&
      selectedSize.extras.menu_item_nutritional_values.length > 0
    ) {
      const mappedValues = selectedSize.extras.menu_item_nutritional_values.map(
        (nv) => ({
          name: nutritionalMapping[nv.id] || `Valore #${nv.id}`,
          value: nv.value || 'N/A',
        }),
      )

      const sizeLabel =
        selectedSize.name ||
        selectedSize.extras.menu_item_nutritional_values_size ||
        item.nutritionalSizeLabel
      return { mappedValues, sizeLabel }
    }
    // Fallback: Use data already processed in the backend
    return {
      mappedValues: item.nutritionalValues,
      sizeLabel: item.nutritionalSizeLabel,
    }
  }

  const currentNutrition = computeNutrition()

  return (
    <div
      key={item.id}
      className="relative border p-4 rounded-lg shadow-lg overflow-hidden bg-white"
    >
      {/* Image Management */}
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

      {/* "SOLD OUT" Badge */}
      {outOfStock && (
        <span className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
          ESAURITO
        </span>
      )}

      {/* Main data */}
      <p className="font-medium mt-2 text-lg">{item.name}</p>
      <p className="text-gray-500 mt-2 font-semibold">
        € {displayPrice},00
        {selectedSize && (
          <span className="text-sm text-gray-500 ml-2">
            {selectedSize.name}
            {selectedSize.price !== 0 && (
              <>
                {' '}
                ({selectedSize.price > 0 ? '+' : '-'} €{' '}
                {Math.abs(selectedSize.price)},00)
              </>
            )}
          </span>
        )}
      </p>
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

      {/* Icons to show details */}
      <div className="flex items-center mt-4">
        <div className="flex items-center space-x-4">
          {(item.ingredients || item.description) && (
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
          {item.extras?.length > 0 && (
            <button
              onClick={() => toggleSection('extras')}
              className={`flex items-center transition-transform duration-300 ${
                activeSection === 'extras'
                  ? 'scale-125 text-accent'
                  : 'scale-100 text-gray-500'
              }`}
            >
              <FaFire className="text-2xl" title="Extras" />
            </button>
          )}
        </div>
        {item.sizes && item.sizes.length > 0 && (
          <div className="ml-auto">
            <button
              onClick={() => toggleSection('sizes')}
              className={`flex items-center transition-transform duration-300 ${
                activeSection === 'sizes'
                  ? 'scale-125 text-accent'
                  : 'scale-100 text-gray-500'
              }`}
            >
              <AnimatedTrafficLight
                title="Impostazioni"
                className="text-2xl"
                selected={activeSection === 'sizes'}
              />
            </button>
          </div>
        )}
      </div>

      {/* Detail sections */}
      {activeSection === 'ingredients' && item.ingredients && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Ingredienti:</strong> {item.ingredients}
          </p>
        </div>
      )}
      {activeSection === 'ingredients' && item.description && (
        <div className="mt-4">
          <hr className="border-gray-300 my-2" />
          <p className="text-sm text-gray-700">
            <strong>Descrizione:</strong> {item.description}
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

      {activeSection === 'nutritionalValues' &&
        currentNutrition.mappedValues && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Valori nutrizionali in grammi ({currentNutrition.sizeLabel}):
            </p>
            <table className="w-full text-sm text-gray-700 border-collapse border-spacing-y-2">
              <tbody>
                {currentNutrition.mappedValues
                  .filter((nv) => Number(nv.value) !== 0)
                  .map((nv, index) => (
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

      {activeSection === 'sizes' && item.sizes && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Scegli la misura desiderata:</strong>
          </p>
          <div className="flex flex-col gap-2">
            {item.sizes.map((sizeOption, idx) => (
              <div key={idx} className="flex items-center">
                {/* Modified button code remains unchanged */}
                <button
                  onClick={() => {
                    if (selectedSize && selectedSize.name === sizeOption.name) {
                      setSelectedSize(null)
                    } else {
                      setSelectedSize(sizeOption)
                    }
                  }}
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${
                    selectedSize && selectedSize.name === sizeOption.name
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`transform transition-transform duration-200 inline-block w-5 h-5 bg-white rounded-full ${
                      selectedSize && selectedSize.name === sizeOption.name
                        ? 'translate-x-5'
                        : 'translate-x-1'
                    }`}
                  ></span>
                </button>
                <span className="ml-2 text-sm">{sizeOption.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'extras' && extrasArray.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Extras:</strong>
          </p>
          <div className="flex flex-col gap-2">
            {extrasArray.map((extra, idx) => (
              <div key={idx} className="flex items-center">
                {/* Show only the extra label */}
                <span className="mr-2 text-sm">{extra.label}</span>
                <button
                  onClick={() => {}}
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${
                    extra.default ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`transform transition-transform duration-200 inline-block w-5 h-5 bg-white rounded-full ${
                      extra.default ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuCard
