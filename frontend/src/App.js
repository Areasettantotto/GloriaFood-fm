import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Contatti from './pages/Contatti'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

export const HoverLink = ({ className = '', ...props }) => {
  return (
    <a
      {...props}
      className={`no-underline transition-colors duration-300 hover:text-accent ${className}`}
    />
  )
}

export const HoverLinkRouter = ({ className = '', ...props }) => {
  return (
    <Link
      {...props}
      className={`no-underline transition-colors duration-300 hover:text-accent ${className}`}
    />
  )
}

function App() {
  const location = useLocation() // Get current position for conditional animations

  return (
    <Layout>
      <ScrollToTop /> {/* Always scroll to top on route change */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Contatti" element={<Contatti />} />
          <Route path="/Privacy-policy" element={<PrivacyPolicy />} />
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
