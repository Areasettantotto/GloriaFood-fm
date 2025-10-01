# ===== STAGE 1: Build React App =====
FROM node:23-alpine AS builder

# Aggiorna pacchetti di sistema e OpenSSL (fix CVE-2025-9230)
RUN apk update && apk upgrade --no-cache && \
  apk add --no-cache openssl

WORKDIR /app

# Copy only the files needed to install dependencies and build
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== STAGE 2: Serve Static Files =====
FROM node:23-alpine AS runner

# Aggiorna pacchetti di sistema e OpenSSL
RUN apk update && apk upgrade --no-cache && \
  apk add --no-cache openssl

WORKDIR /app

# Install 'serve' globally to serve built files
RUN npm install -g serve

# Copy only the build folder from the builder stage
COPY --from=builder /app/build ./build

# Expose the port used by 'serve' (3000)
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
