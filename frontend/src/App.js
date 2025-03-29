// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion' // Importa AnimatePresence
import Home from './pages/Home'
import Menu from './pages/Menu'
//import Menu_basic from './pages/Menu_basic'
import Contatti from './pages/Contatti'
import NotFound from './pages/NotFound'
import Layout from './components/Layout' // Importa il Layout

function App() {
  const location = useLocation() // Ottieni la posizione corrente per animazioni condizionali

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {' '}
        {/* Permette l'uscita delle pagine */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          {/*<Route path="/Menu_basic" element={<Menu_basic />} />*/}
          <Route path="/Contatti" element={<Contatti />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default WrappedApp
