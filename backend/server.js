require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const moment = require('moment');
const nutritionalMapping = require('./config/nutritionalValues');

const app = express();

app.use(cors());
app.use(express.json());

// Configurations from the environment
const API_KEY = process.env.GLORIAFOOD_API_KEY;
const API_URL = process.env.GLORIAFOOD_API_URL;

if (!API_KEY || !API_URL) {
  console.error('Errore: Variabili ambiente non configurate correttamente');
  process.exit(1);
}

// Allergens MAPPING
const mapAllergens = (allergens) => {
  return (
    allergens?.map((allergen) => allergen.name || `ID ${allergen.id}`) || []
  );
};

// Nutritionals Vvalues MAPPING
const mapNutritionalValues = (nutritionalValues, size) => {
  let sizeLabel;
  if (size && typeof size === 'object' && size.name) {
    sizeLabel = size.name;
  } else if (typeof size === 'string') {
    sizeLabel = size === 'per_100g' ? 'per 100 grammi' : 'per porzione';
  } else {
    sizeLabel = '';
  }
  const mappedValues = nutritionalValues.map((nutritional) => ({
    name: nutritionalMapping[nutritional.id] || `Valore #${nutritional.id}`,
    value: nutritional.value || 'N/A',
  }));
  return { mappedValues, sizeLabel };
};

// Menù Endpoint
app.get('/api/menu', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: API_KEY,
        Accept: 'application/json',
        'Glf-Api-Version': '2',
      },
    });

    const menu = response.data;

    // Processing categories and menu items
    menu.categories = menu.categories.filter(
      (category) => category.active && (!category.hidden_until || moment().isAfter(category.hidden_until))
    );

    menu.categories.forEach((category) => {
      // Filter active and non-hidden items
      category.items = category.items.filter(
        (item) =>
          item.active &&
          (!item.hidden_until || moment().isAfter(item.hidden_until))
      );

      category.items.forEach((item) => {
        // Add image path for each item (to improve management)
        item.image = `/images/menu/${item.id}.jpg`;

        // Tags MAPPING
        item.tags = item.tags || [];

        // Allergens MAPPING
        item.allergens = mapAllergens(item.extras?.menu_item_allergens_values);

        // Nutritional Values MAPPING
        if (item.extras?.menu_item_nutritional_values?.length > 0) {
          const { mappedValues, sizeLabel } = mapNutritionalValues(
            item.extras.menu_item_nutritional_values,
            item.extras.menu_item_nutritional_values_size
          );
          item.nutritionalValues = mappedValues;
          item.nutritionalSizeLabel = sizeLabel;
        }

        // Preselect only one variation marked as default and whose price is equal to the base price
        item.selectedSize = item.variations?.find(
          (variation) => variation.default && variation.price === item.price
        );

        // Set displayPrice equal to the base price of the item
        item.displayPrice = item.price;
      });
    });

    // Reply with the elaborate menu
    res.status(200).json(menu);
  } catch (error) {
    console.error(`Errore durante il recupero del menu: ${error.response?.data || error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Server port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server in ascolto su porta ${PORT}`));
