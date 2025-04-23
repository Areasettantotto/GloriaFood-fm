import { useState, useEffect } from 'react'
import siteConfig from '../config/siteConfig.json'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Ristorante {siteConfig.name} - Header</title>
          <meta name="description" content={siteConfig.payoff} />
        </Helmet>
      </HelmetProvider>

      <header
        className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
          scrolled
            ? 'bg-primary shadow-lg text-white'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="flex justify-between items-center p-6 container mx-auto">
          {/* Logo with icon */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80"
          >
            <img
              src="/images/icon.svg"
              alt="Icona personalizzata"
              className="w-8 h-8"
            />
            <span>{siteConfig.name}</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <nav className="space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-accent font-bold' : 'hover:text-accent'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive ? 'text-accent font-bold' : 'hover:text-accent'
                }
              >
                Menù
              </NavLink>
              {/*<NavLink
                to="/Menu_basic"
                className={({ isActive }) =>
                  isActive ? 'text-accent font-bold' : 'hover:text-accent'
                }
              >
                Menù 2
              </NavLink>*/}
              <NavLink
                to="/contatti"
                className={({ isActive }) =>
                  isActive ? 'text-accent font-bold' : 'hover:text-accent'
                }
              >
                Contatti
              </NavLink>
            </nav>
            <div className="flex space-x-4">
              <a
                href={siteConfig.button_reservation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 bg-secondary hover:bg-opacity-90 text-white font-bold rounded">
                  Prenota un Tavolo
                </button>
              </a>
              <a
                href={siteConfig.button_pay}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 bg-accent hover:bg-opacity-90 text-white font-bold rounded">
                  Vedi Menù e Ordina
                </button>
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center space-x-4">
            <a
              href={siteConfig.button_pay}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-4 py-2 bg-accent hover:bg-opacity-90 text-white rounded">
                Ordina Online
              </button>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 18h10"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded mobile menu */}
        {menuOpen && (
          <div className="bg-primary md:hidden flex flex-col items-stretch px-6 py-4 space-y-4">
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? 'text-accent font-bold' : 'hover:text-accent'
              }
              onClick={() => setMenuOpen(false)}
            >
              Menù
            </NavLink>
            <NavLink
              to="/contatti"
              className={({ isActive }) =>
                isActive ? 'text-accent font-bold' : 'hover:text-accent'
              }
              onClick={() => setMenuOpen(false)}
            >
              Contatti
            </NavLink>
            <a
              href={siteConfig.button_reservation}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button
                className="px-4 py-2 bg-secondary hover:bg-opacity-90 text-white rounded w-full text-left"
                onClick={() => setMenuOpen(false)}
              >
                Prenota un Tavolo
              </button>
            </a>
            <a href={`tel:${siteConfig.phone}`} target="_new" className="block">
              <button
                className="px-4 py-2 bg-green-900 hover:bg-opacity-90 text-white rounded w-full text-left"
                onClick={() => setMenuOpen(false)}
              >
                Contattaci Telefonicamente
              </button>
            </a>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
