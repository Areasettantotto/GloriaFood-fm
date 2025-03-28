# Restaurant Website - GloriaFood Integration

A modern restaurant website integrated with the **GloriaFood API** to dynamically fetch and display the menu in real-time. Designed for easy customization, automation, and scalability across multiple restaurants.

## 🚀 Features
- **3 Main Pages**: Home, Contact, Menu
- **Real-time Menu Sync**: Automatically fetches menu from GloriaFood API
- **Customizable Home & Contact Pages**: Configurable via JSON file
- **CI/CD Ready**: Continuous deployment with GitHub, Docker Hub, and Render
- **Scalable**: Easily adaptable for multiple restaurants

## 🛠️ Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions + Docker Hub + Render

## 📦 Installation Options

### 🔧 1. Run Locally with Node (Frontend + Backend)

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Backend Setup
```bash
cd backend
npm install
npm start
```

#### Note: Create a .env file in the backend dir:

```sh
GLORIAFOOD_API_KEY=your_api_key_here
GLORIAFOOD_API_URL=https://pos.globalfoodsoft.com/pos/menu
PORT=4000
```

### 🐳 2. Docker Compose (Local Only)

1. Build and start the container:
```sh
docker-compose up --build -d
```
2. To stop the containers:
```sh
docker-compose down
```

### ☁️ 3. CI/CD with GitHub, Docker Hub, and Render (Production)

Workflow:
1. Push to GitHub → triggers GitHub Actions

2. Build and push to Docker Hub → updated images

3. Deploy on Render → automatically pulls new images and updates the live site

Configuration:
Environment variables are set in Render’s dashboard (no .env file required in production).

Backend example variables on Render:
```sh
GLORIAFOOD_API_KEY=your_api_key
GLORIAFOOD_API_URL=https://pos.globalfoodsoft.com/pos/menu
PORT=4000
```
Frontend variable (Render):
```sh
REACT_APP_BACKEND_URL=https://your-backend-service.com
```

## ⚙️ Site Configuration

Customize Home and Contact page data using:
```sh
frontend/src/config/siteConfig.json
```
Menu data is automatically fetched from GloriaFood via API and managed directly by the restaurant staff through their GloriaFood admin panel.

## 📁 Project Structure (Overview)

```sh
app
/frontend           # React frontend directory
/backend            # Node.js backend directory
/.github-workflows  # CI/CD github/dockerhub/render
docker-compose.yml  # Docker Compose (only local)
.env.example.txt    # Example environment variables
.gitignore
.eslintignore
```

## 🤝 Contributions

Feel free to fork this repository and submit pull requests to improve features, fix bugs, or add enhancements!

## 📄 License

This project is licensed under the MIT License. Use it, modify it, and enjoy!

## 🌐 Live Demo
```sh
https://gloriafood-fm-1.onrender.com
```
