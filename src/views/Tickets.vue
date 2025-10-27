<template>
  <div class="container">
    <div class="section">
      <h2>Ticket Management</h2>
      <button @click="showCreateForm = !showCreateForm" class="btn btn-primary">
        {{ showCreateForm ? 'Cancel' : 'Create New Ticket' }}
      </button>

      <form v-if="showCreateForm" @submit.prevent="createTicket" class="card" style="margin-top: 20px;">
        <h3>Create Ticket</h3>
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            id="title"
            v-model="newTicket.title"
            required
            :class="{ error: errors.title }"
          />
          <div v-if="errors.title" class="error">{{ errors.title }}</div>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="newTicket.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="status">Status *</label>
          <select
            id="status"
            v-model="newTicket.status"
            required
            :class="{ error: errors.status }"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <div v-if="errors.status" class="error">{{ errors.status }}</div>
        </div>
        <div class="form-group">
          <label for="priority">Priority</label>
          <select id="priority" v-model="newTicket.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Create Ticket</button>
      </form>

      <div class="grid" style="margin-top: 20px;">
        <div v-for="ticket in tickets" :key="ticket.id" class="card">
          <h3>{{ ticket.title }}</h3>
          <p>{{ ticket.description }}</p>
          <p>Status: <span :class="'status-' + ticket.status">{{ ticket.status }}</span></p>
          <p>Priority: {{ ticket.priority }}</p>
          <div style="margin-top: 10px;">
            <button @click="editTicket(ticket)" class="btn btn-secondary">Edit</button>
            <button @click="deleteTicket(ticket.id)" class="btn btn-secondary">Delete</button>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="editingTicket" class="modal" @click="closeEdit">
        <div class="modal-content" @click.stop>
          <h3>Edit Ticket</h3>
          <form @submit.prevent="updateTicket">
            <div class="form-group">
              <label for="edit-title">Title *</label>
              <input
                id="edit-title"
                v-model="editingTicket.title"
                required
                :class="{ error: errors.title }"
              />
              <div v-if="errors.title" class="error">{{ errors.title }}</div>
            </div>
            <div class="form-group">
              <label for="edit-description">Description</label>
              <textarea
                id="edit-description"
                v-model="editingTicket.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="edit-status">Status *</label>
              <select
                id="edit-status"
                v-model="editingTicket.status"
                required
                :class="{ error: errors.status }"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <div v-if="errors.status" class="error">{{ errors.status }}</div>
            </div>
            <div class="form-group">
              <label for="edit-priority">Priority</label>
              <select id="edit-priority" v-model="editingTicket.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Update Ticket</button>
            <button type="button" @click="closeEdit" class="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTickets, createTicket as create, updateTicket as update, deleteTicket as del } from '../utils/tickets'

export default {
  name: 'TicketsView',
  data() {
    return {
      tickets: [],
      showCreateForm: false,
      newTicket: {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      },
      editingTicket: null,
      errors: {}
    }
  },
  mounted() {
    this.loadTickets()
  },
  methods: {
    loadTickets() {
      this.tickets = getTickets()
    },
    validateTicket(ticket) {
      this.errors = {}
      if (!ticket.title) {
        this.errors.title = 'Title is required'
      }
      if (!ticket.status || !['open', 'in_progress', 'closed'].includes(ticket.status)) {
        this.errors.status = 'Status is required and must be valid'
      }
      return Object.keys(this.errors).length === 0
    },
    createTicket() {
      if (!this.validateTicket(this.newTicket)) return

      try {
        create(this.newTicket)
        this.showToast('success', 'Ticket created successfully')
        this.newTicket = { title: '', description: '', status: 'open', priority: 'medium' }
        this.showCreateForm = false
        this.loadTickets()
      } catch (error) {
        this.showToast('error', 'Failed to create ticket')
      }
    },
    editTicket(ticket) {
      this.editingTicket = { ...ticket }
      this.errors = {}
    },
    updateTicket() {
      if (!this.validateTicket(this.editingTicket)) return

      try {
        update(this.editingTicket.id, this.editingTicket)
        this.showToast('success', 'Ticket updated successfully')
        this.closeEdit()
        this.loadTickets()
      } catch (error) {
        this.showToast('error', 'Failed to update ticket')
      }
    },
    deleteTicket(id) {
      if (confirm('Are you sure you want to delete this ticket?')) {
        try {
          del(id)
          this.showToast('success', 'Ticket deleted successfully')
          this.loadTickets()
        } catch (error) {
          this.showToast('error', 'Failed to delete ticket')
        }
      }
    },
    closeEdit() {
      this.editingTicket = null
    },
    showToast(type, message) {
      alert(message)
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
}
</style>
