# ===== STAGE 1: Build React App =====
FROM node:18-alpine AS builder

WORKDIR /app

# Copia solo i file necessari per installare dipendenze e buildare
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== STAGE 2: Serve Static Files =====
FROM node:18-alpine AS runner

WORKDIR /app

# Installa globalmente serve per servire i file buildati
RUN npm install -g serve

# Copia solo la cartella build dal container di build
COPY --from=builder /app/build ./build

# Exponi la porta usata da serve (3000)
EXPOSE 3000

# Comando per avviare l'app
CMD ["serve", "-s", "build", "-l", "3000"]
