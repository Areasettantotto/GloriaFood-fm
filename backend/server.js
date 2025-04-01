require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const moment = require('moment');
const nutritionalMapping = require('./config/nutritionalValues'); // Importa la mappatura dei valori nutrizionali per recuperarle il nome del valore (non disponibile nel file json di Gloriafood)

const app = express();

app.use(cors());
app.use(express.json());

// Configurazioni dall'ambiente
const API_KEY = process.env.GLORIAFOOD_API_KEY;
const API_URL = process.env.GLORIAFOOD_API_URL;

if (!API_KEY || !API_URL) {
  console.error('Errore: Variabili ambiente non configurate correttamente');
  process.exit(1);
}

// Funzione per mappare allergeni
const mapAllergens = (allergens) => {
  return (
    allergens?.map((allergen) => allergen.name || `ID ${allergen.id}`) || []
  );
};

// Funzione per mappare valori nutrizionali
const mapNutritionalValues = (nutritionalValues, size) => {
  const sizeLabel = size === 'per_100g' ? 'per 100gg' : 'per porzione';
  const mappedValues = nutritionalValues.map((nutritional) => ({
    name: nutritionalMapping[nutritional.id] || `Valore #${nutritional.id}`,
    value: nutritional.value || 'N/A',
  }));
  return { mappedValues, sizeLabel };
};

// Endpoint per il menu
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

    // Elaborazione delle categorie e degli elementi del menu
    menu.categories = menu.categories.filter(
      (category) => category.active && (!category.hidden_until || moment().isAfter(category.hidden_until))
    );

    menu.categories.forEach((category) => {
      // Filtra gli elementi attivi e non nascosti
      category.items = category.items.filter(
        (item) =>
          item.active &&
          (!item.hidden_until || moment().isAfter(item.hidden_until))
      );

      category.items.forEach((item) => {
        // Aggiungi percorso immagine per ogni elemento
        item.image = `/images/menu/${item.id}.jpg`;

        // Mappa i tag
        item.tags = item.tags || [];

        // Mappa allergeni
        item.allergens = mapAllergens(item.extras?.menu_item_allergens_values);

        // Mappa valori nutrizionali
        if (item.extras?.menu_item_nutritional_values?.length > 0) {
          const { mappedValues, sizeLabel } = mapNutritionalValues(
            item.extras.menu_item_nutritional_values,
            item.extras.menu_item_nutritional_values_size
          );
          item.nutritionalValues = mappedValues;
          item.nutritionalSizeLabel = sizeLabel;
        }

        // Preseleziona solo una variazione contrassegnata come predefinita e il cui prezzo è uguale al prezzo base
        item.selectedSize = item.variations?.find(
          (variation) => variation.default && variation.price === item.price
        );

        // Imposta displayPrice uguale al prezzo base dell'elemento
        item.displayPrice = item.price;
      });
    });

    // Risposta con il menu elaborato
    res.status(200).json(menu);
  } catch (error) {
    console.error(`Errore durante il recupero del menu: ${error.response?.data || error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Porta del server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server in ascolto su porta ${PORT}`));
