const STORAGE_KEY = 'devportal_auth'

const readSavedAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export const getToken = () => {
  const saved = readSavedAuth()
  return saved?.token || null
}

export const getCurrentUserFromStorage = () => {
  const saved = readSavedAuth()
  return saved?.user || null
}

export const setAuth = (payload) => {
  if (!payload) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY)
}


