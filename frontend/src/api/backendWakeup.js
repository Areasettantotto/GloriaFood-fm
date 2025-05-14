import backendUrl from '../config/config.js'

let backendWoken = false // new flag to avoid duplicate wakeup

const wakeupBackend = async () => {
  if (backendWoken) {
    console.log('Backend already preloaded')
    return
  }
  try {
    const response = await fetch(`${backendUrl}/api/menu`)
    backendWoken = true
    console.log('Backend preloaded')
    return response
  } catch (error) {
    console.error('Error preloading backend:', error)
  }
}

export default wakeupBackend
