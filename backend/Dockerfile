# Utilizza un'immagine di base per Node.js
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file dell'applicazione
COPY . .

# Espone la porta 4000
EXPOSE 4000

# Comando per avviare l'applicazione
CMD ["npm", "run", "dev"]
