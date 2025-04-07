import { useState, useEffect } from 'react'

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)
  const [reopen, setReopen] = useState(false)
  const [lang, setLang] = useState('it')

  // Messaggi di consenso per le lingue
  const messages = {
    it: {
      message:
        "Questo sito utilizza cookie per migliorare l'esperienza utente.",
      accept: 'Accetta',
      decline: 'Rifiuta',
      reopen: 'Privacy',
      privacyLink: 'Leggi la nostra politica sulla privacy', // Aggiunto link
    },
    en: {
      message: 'This site uses cookies to enhance the user experience.',
      accept: 'Accept',
      decline: 'Decline',
      reopen: 'Privacy',
      privacyLink: 'Read our privacy policy', // Aggiunto link
    },
  }

  useEffect(() => {
    // Controlla se l'utente ha già dato il consenso
    const savedConsent = localStorage.getItem('cookie_consent')
    // Imposta la lingua in base alla lingua del browser
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'it'
    setLang(browserLang)

    if (!savedConsent) {
      setVisible(true) // Mostra il widget se non c'è consenso salvato
    } else {
      setReopen(true) // Mostra il bottone per riaprire il consenso
    }
  }, [])

  // Gestisce il consenso dell'utente
  const handleConsent = (accepted) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined')
    setVisible(false) // Nasconde il widget dopo la risposta
    setReopen(true) // Mostra il bottone per riaprire il consenso
  }

  // Rende visibile il widget di consenso
  const toggleWidget = () => setVisible(true)

  // Messaggi in base alla lingua
  const t = messages[lang]

  return (
    <>
      {/* Se il widget è visibile, mostra il consenso */}
      {visible && (
        <div className="fixed bottom-4 left-4 right-4 md:right-auto bg-white border border-gray-300 shadow-xl p-4 rounded-2xl max-w-xl mx-auto z-50 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 text-sm text-gray-800">
            {t.message}{' '}
            <a
              href="/privacy-policy" // Link alla pagina privacy
              className="text-blue-600 hover:underline"
            >
              {t.privacyLink}
            </a>
          </div>
          <div className="flex gap-2">
            {/* Bottone per accettare il consenso */}
            <button
              onClick={() => handleConsent(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {t.accept}
            </button>
            {/* Bottone per rifiutare il consenso */}
            <button
              onClick={() => handleConsent(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              {t.decline}
            </button>
          </div>
        </div>
      )}

      {/* Bottone per riaprire il widget se il consenso è già stato dato */}
      {reopen && !visible && (
        <button
          onClick={toggleWidget}
          className="fixed bottom-4 right-4 z-40 bg-gray-800 text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
          aria-label="Ri-apri preferenze privacy"
        >
          {t.reopen}
        </button>
      )}
    </>
  )
}

export default CookieConsent
