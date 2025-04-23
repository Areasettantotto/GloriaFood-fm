# ===== STAGE 1: Build React App =====
FROM node:23-alpine AS builder

WORKDIR /app

# Copy only the files needed to install dependencies and build
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== STAGE 2: Serve Static Files =====
FROM node:23-alpine AS runner

WORKDIR /app

# Install 'serve' globally to serve built files
RUN npm install -g serve

# Copy only the build folder from the builder stage
COPY --from=builder /app/build ./build

# Expose the port used by 'serve' (3000)
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
