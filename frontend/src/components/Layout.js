// src/components/Layout.js
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

// Add validation for the "children" prop
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Verify that "children" is a React node
}

export default Layout
