import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Global loader definition
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
    // Function to check if all resources are loaded
    const checkAllResourcesLoaded = () => {
      const resourcesLoaded = document.readyState === 'complete'
      if (resourcesLoaded) {
        setIsLoading(false)
      }
    }

    checkAllResourcesLoaded()

    // Perform periodic check-up
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

// Measure performance, if desired
reportWebVitals()
