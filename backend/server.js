require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const moment = require('moment');

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

// Mappatura ID a nomi di valori nutrizionali
const NUTRITIONAL_MAPPING = {
  9: 'Calorie totali (kcal)',
  10: 'Carboidrati',
  11: 'Grassi',
  12: 'Proteine',
  13: 'Zuccheri',
  14: 'Sale',
  15: 'Pepe',
  // Aggiungi qui altre corrispondenze come desiderato
};

// Funzione per mappare allergeni
const mapAllergens = (allergens) => {
  return (
    allergens?.map((allergen) => allergen.name || `ID ${allergen.id}`) || []
  );
};

// Funzione per mappare valori nutrizionali
const mapNutritionalValues = (nutritionalValues, size) => {
  const sizeLabel = size === 'per_100g' ? 'per 100g' : 'per porzione';
  const mappedValues = nutritionalValues.map((nutritional) => ({
    name: NUTRITIONAL_MAPPING[nutritional.id] || `Valore #${nutritional.id}`,
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
