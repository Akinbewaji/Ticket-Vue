export const login = (email, password) => {
  // Simulate login
  if (email && password) {
    localStorage.setItem('ticketapp_session', 'logged_in')
    return { success: true }
  }
  return { success: false, error: 'Invalid credentials' }
}

export const signup = (email, password) => {
  // Simulate signup
  if (email && password) {
    localStorage.setItem('ticketapp_session', 'logged_in')
    return { success: true }
  }
  return { success: false, error: 'Signup failed' }
}

export const logout = () => {
  localStorage.removeItem('ticketapp_session')
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('ticketapp_session')
}
