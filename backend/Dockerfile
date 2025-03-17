FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && ls -la node_modules

COPY . .

EXPOSE 4000
CMD ["npm", "start"]
