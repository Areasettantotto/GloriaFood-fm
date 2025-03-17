FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && ls -la node_modules

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
