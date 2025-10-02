const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://GloriaFood-fm.onrender.com'
    : 'http://127.0.0.1:4000' // 192.168.1.57 ...use your local IP address to test on other devices

export default BACKEND_URL
