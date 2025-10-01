# Use lightweight Node.js image
FROM node:23-alpine

# Aggiorna pacchetti di sistema e OpenSSL (fix per CVE-2025-9230)
RUN apk update && apk upgrade --no-cache && \
  apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy only package files first for better cache usage
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend
CMD ["npm", "start"]

