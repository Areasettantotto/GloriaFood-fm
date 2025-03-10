// src/components/Layout.js
import PropTypes from 'prop-types' // Importa PropTypes per la validazione dei props
import Header from './Header' // Importa il Header
import Footer from './Footer' // Importa il Footer

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

// Aggiungi la validazione del prop "children"
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Verifica che "children" sia un nodo React
}

export default Layout
