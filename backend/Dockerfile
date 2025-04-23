# Use lightweight Node.js image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for better cache usage
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend
CMD ["npm", "start"]
