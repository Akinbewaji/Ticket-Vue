<template>
  <div class="container">
    <div class="section">
      <h2>Dashboard</h2>
      <div class="grid">
        <div class="card">
          <h3>Total Tickets</h3>
          <p>{{ totalTickets }}</p>
        </div>
        <div class="card">
          <h3>Open Tickets</h3>
          <p>{{ openTickets }}</p>
        </div>
        <div class="card">
          <h3>Resolved Tickets</h3>
          <p>{{ resolvedTickets }}</p>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <router-link to="/tickets" class="btn btn-primary">Manage Tickets</router-link>
        <button @click="logout" class="btn btn-secondary">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '../utils/auth'
import { getTickets } from '../utils/tickets'

export default {
  name: 'DashboardView',
  data() {
    return {
      tickets: []
    }
  },
  computed: {
    totalTickets() {
      return this.tickets.length
    },
    openTickets() {
      return this.tickets.filter(t => t.status === 'open').length
    },
    resolvedTickets() {
      return this.tickets.filter(t => t.status === 'closed').length
    }
  },
  mounted() {
    this.loadTickets()
  },
  methods: {
    loadTickets() {
      this.tickets = getTickets()
    },
    logout() {
      logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
