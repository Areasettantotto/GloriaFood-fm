const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://GloriaFood-fm.onrender.com'
    : 'http://localhost:4000'

export default BACKEND_URL
