import siteConfig from '../config/siteConfig.json' // Importa il file JSON con le info dell'attività
import { Helmet } from 'react-helmet'

function Contatti() {
  return (
    <>
      <Helmet>
        <title>Ristorante {siteConfig.name} - 404</title>
        <meta name="description" content="{siteConfig.payoff}" />
      </Helmet>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center">404</h1>
        <p className="text-center mt-4">Pagina non trovata.</p>
      </div>
    </>
  )
}

export default Contatti
