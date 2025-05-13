import backendUrl from '../config/config.js'

const wakeupBackend = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/menu`)
    console.log('Backend preloaded')
    return response
  } catch (error) {
    console.error('Error preloading backend:', error)
  }
}

export default wakeupBackend
