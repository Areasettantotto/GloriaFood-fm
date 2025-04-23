import { Helmet, HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Banner from '../components/Banner'
import siteConfig from '../config/siteConfig.json'
import { pageVariants, pageTransition } from '../config/motionConfig'

const PrivacyPolicy = () => {
  return (
    <HelmetProvider>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Banner
          mediaType="video"
          mediaSrc="videos/ProvacyPolicy.mp4"
          bannerHeight="30%"
          title="Privacy Policy"
          showLogo={false}
        />
        <div className="container mx-auto px-6 py-12">
          <Helmet>
            <title>Privacy Policy - {siteConfig.home_helmet_title}</title>
            <meta name="description" content="Privacy policy del sito." />
          </Helmet>

          <h1 className="text-3xl font-semibold text-center mb-8">
            Privacy Policy
          </h1>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduzione</h2>
              <p>
                La tua privacy è molto importante per noi. Questa politica sulla
                privacy descrive le informazioni che raccogliamo e come le
                utilizziamo, proteggiamo e condividiamo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Informazioni che raccogliamo
              </h2>
              <p>
                Raccoliamo informazioni personali come il tuo nome, indirizzo
                email, e informazioni di pagamento solo quando le fornisci
                volontariamente. Utilizziamo anche cookie per migliorare la tua
                esperienza di navigazione sul nostro sito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Come utilizziamo le informazioni
              </h2>
              <p>
                Le informazioni raccolte vengono utilizzate per migliorare il
                servizio offerto, inviare aggiornamenti e per garantire che il
                nostro sito web funzioni correttamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">I cookie</h2>
              <p>
                Utilizziamo i cookie per migliorare la tua esperienza sul nostro
                sito. I cookie sono piccoli file che vengono salvati nel tuo
                dispositivo per memorizzare preferenze e altre informazioni
                temporanee.
              </p>
              <p>
                Puoi scegliere di disabilitare i cookie nelle impostazioni del
                tuo browser, ma questo potrebbe influire sulla tua esperienza
                sul nostro sito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Condivisione delle informazioni
              </h2>
              <p>
                Non vendiamo, scambiamo o altrimenti trasferiamo le tue
                informazioni personali a terze parti senza il tuo consenso,
                salvo quanto necessario per adempiere a obblighi legali o per la
                gestione del nostro sito web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Sicurezza delle informazioni
              </h2>
              <p>
                Proteggiamo le tue informazioni personali attraverso misure di
                sicurezza avanzate per prevenire accessi non autorizzati,
                alterazioni o divulgazioni.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Modifiche alla Privacy Policy
              </h2>
              <p>
                Ci riserviamo il diritto di modificare questa politica in
                qualsiasi momento. Le modifiche saranno pubblicate su questa
                pagina con una data di revisione aggiornata.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contattaci</h2>
              <p>
                Se hai domande o dubbi riguardo alla nostra politica sulla
                privacy, non esitare a contattarci via email a:{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-blue-600"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </HelmetProvider>
  )
}

export default PrivacyPolicy
