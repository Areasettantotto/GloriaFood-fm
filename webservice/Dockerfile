FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Non esponi la porta 3306, ma la usi per connetterti a un DB esterno
EXPOSE 5000

CMD ["npm", "start"]
