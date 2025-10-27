const STORAGE_KEY = 'ticketapp_tickets'

export const getTickets = () => {
  const tickets = localStorage.getItem(STORAGE_KEY)
  return tickets ? JSON.parse(tickets) : []
}

export const saveTickets = (tickets) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}

export const createTicket = (ticket) => {
  const tickets = getTickets()
  const newTicket = { ...ticket, id: Date.now(), createdAt: new Date().toISOString() }
  tickets.push(newTicket)
  saveTickets(tickets)
  return newTicket
}

export const updateTicket = (id, updates) => {
  const tickets = getTickets()
  const index = tickets.findIndex(t => t.id === id)
  if (index !== -1) {
    tickets[index] = { ...tickets[index], ...updates }
    saveTickets(tickets)
    return tickets[index]
  }
  throw new Error('Ticket not found')
}

export const deleteTicket = (id) => {
  const tickets = getTickets()
  const filtered = tickets.filter(t => t.id !== id)
  saveTickets(filtered)
}
