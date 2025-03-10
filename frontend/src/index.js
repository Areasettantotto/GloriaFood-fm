import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Definizione del loader globale
const GlobalLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[9999]">
      <div className="loader w-12 h-12 border-4 border-t-accent border-solid rounded-full animate-spin"></div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const Main = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Funzione per verificare se tutte le risorse sono caricate
    const checkAllResourcesLoaded = () => {
      const resourcesLoaded = document.readyState === 'complete'
      if (resourcesLoaded) {
        setIsLoading(false)
      }
    }

    checkAllResourcesLoaded()

    // Aggiungi altri controlli per dati API, immagini, ecc.
    // Esempio:
    // const fetchData = async () => {
    //   const response = await fetch('/api/data');
    //   const data = await response.json();
    //   if (data) {
    //     setIsLoading(false);
    //   }
    // };
    // fetchData();

    // Esegui il controllo periodico
    const interval = setInterval(checkAllResourcesLoaded, 1000)

    return () => clearInterval(interval)
  }, [])

  return isLoading ? <GlobalLoader /> : <App />
}

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)

// Misura le performance, se desiderato
reportWebVitals()
