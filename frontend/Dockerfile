FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && ls -la node_modules

COPY . .

RUN npm run build

RUN npm install -g serve

# Definisce l'URL del backend nel frontend in produzione
ENV REACT_APP_API_URL=http://backend:4000

CMD ["serve", "-s", "build", "-l", "3000"]
