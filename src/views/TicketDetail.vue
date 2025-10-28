<template>
  <div class="container">
    <div class="section">
      <div class="ticket-detail-header">
        <router-link to="/tickets" class="btn btn-outline back-btn">
          ← Back to Tickets
        </router-link>
        <h2>Ticket Details</h2>
      </div>

      <div v-if="ticket" class="card ticket-detail">
        <div class="ticket-header">
          <h3>{{ ticket.title }}</h3>
          <div class="ticket-meta">
            <span :class="'status-' + ticket.status" class="status-badge">{{ ticket.status }}</span>
            <span class="priority-badge">{{ ticket.priority }}</span>
          </div>
        </div>

        <div class="ticket-body">
          <div class="ticket-description">
            <h4>Description</h4>
            <p>{{ ticket.description || 'No description provided.' }}</p>
          </div>

          <div class="ticket-info">
            <div class="info-item">
              <strong>ID:</strong> {{ ticket.id }}
            </div>
            <div class="info-item">
              <strong>Status:</strong> {{ ticket.status }}
            </div>
            <div class="info-item">
              <strong>Priority:</strong> {{ ticket.priority }}
            </div>
          </div>
        </div>

        <div class="ticket-actions">
          <button @click="editTicket" class="btn btn-primary">Edit Ticket</button>
          <button @click="deleteTicket" class="btn btn-danger">Delete Ticket</button>
        </div>
      </div>

      <div v-else class="card">
        <p>Ticket not found.</p>
        <router-link to="/tickets" class="btn btn-primary">Back to Tickets</router-link>
      </div>

      <!-- Edit Modal (similar to Tickets.vue) -->
      <div v-if="editingTicket" class="modal" @click="closeEdit">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeEdit" aria-label="Close modal">&times;</button>
          <h3>Edit Ticket</h3>
          <form @submit.prevent="updateTicket" class="edit-form">
            <div class="form-header">
              <h3>Edit Ticket</h3>
              <p class="form-description">Update the ticket information below.</p>
            </div>

            <div class="form-grid">
              <InputField
                id="edit-title"
                v-model="editingTicket.title"
                label="Ticket Title *"
                placeholder="Enter ticket title"
                required
                maxlength="100"
                :error-message="errors.title"
              />

              <SelectField
                id="edit-status"
                v-model="editingTicket.status"
                label="Status *"
                placeholder="Select status"
                required
                :options="statusOptions"
                :error-message="errors.status"
              />

              <SelectField
                id="edit-priority"
                v-model="editingTicket.priority"
                label="Priority"
                placeholder="Select priority"
                :options="priorityOptions"
              />
            </div>

            <TextareaField
              id="edit-description"
              v-model="editingTicket.description"
              label="Description"
              placeholder="Provide detailed information about your issue..."
              rows="4"
              maxlength="500"
            />

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner small"></span>
                {{ isSubmitting ? 'Updating...' : 'Update Ticket' }}
              </button>
              <button type="button" @click="closeEdit" class="btn btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTickets, updateTicket as update, deleteTicket as del } from '../utils/tickets'
import InputField from '../components/InputField.vue'
import SelectField from '../components/SelectField.vue'
import TextareaField from '../components/TextareaField.vue'

export default {
  name: 'TicketDetail',
  components: {
    InputField,
    SelectField,
    TextareaField
  },
  data() {
    return {
      ticket: null,
      editingTicket: null,
      isSubmitting: false,
      errors: {},
      statusOptions: [
        { value: 'open', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'closed', label: 'Closed' }
      ],
      priorityOptions: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    }
  },
  mounted() {
    this.loadTicket()
  },
  watch: {
    '$route.params.id': 'loadTicket'
  },
  methods: {
    loadTicket() {
      const id = parseInt(this.$route.params.id)
      const tickets = getTickets()
      this.ticket = tickets.find(t => t.id === id) || null
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
    editTicket() {
      this.editingTicket = { ...this.ticket }
      this.errors = {}
    },
    updateTicket() {
      if (!this.validateTicket(this.editingTicket)) return

      this.isSubmitting = true

      try {
        update(this.editingTicket.id, this.editingTicket)
        this.showToast('success', 'Ticket updated successfully')
        this.closeEdit()
        this.loadTicket() // Reload to reflect changes
      } catch (error) {
        this.showToast('error', 'Failed to update ticket')
      } finally {
        this.isSubmitting = false
      }
    },
    deleteTicket() {
      if (confirm('Are you sure you want to delete this ticket?')) {
        try {
          del(this.ticket.id)
          this.showToast('success', 'Ticket deleted successfully')
          this.$router.push('/tickets')
        } catch (error) {
          this.showToast('error', 'Failed to delete ticket')
        }
      }
    },
    closeEdit() {
      this.editingTicket = null
    },
    showToast(type, message) {
      if (this.$toast) {
        this.$toast.addToast(message, type)
      } else {
        alert(message) // Fallback
      }
    }
  }
}
</script>

<style scoped>
.ticket-detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.back-btn {
  margin: 0;
}

.ticket-detail {
  max-width: 800px;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.ticket-header h3 {
  margin: 0;
  flex: 1;
}

.ticket-meta {
  display: flex;
  gap: 10px;
}

.status-badge, .priority-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-open { background-color: #e3f2fd; color: #1976d2; }
.status-in_progress { background-color: #fff3e0; color: #f57c00; }
.status-closed { background-color: #e8f5e8; color: #388e3c; }

.priority-badge {
  background-color: #f5f5f5;
  color: #333;
}

.ticket-body {
  margin-bottom: 20px;
}

.ticket-description h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--text-color);
}

.ticket-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.info-item {
  padding: 10px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.ticket-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* Modal styles (copied from Tickets.vue) */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: var(--card-bg);
  color: var(--text-color);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  animation: slideIn 0.3s ease-out;
  position: relative;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: var(--spacing-lg);
  color: var(--text-color);
  font-size: 1.25rem;
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: var(--spacing-sm);
}

.modal-content .form-group {
  margin-bottom: var(--spacing-lg);
}

.modal-content .btn {
  margin-right: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.modal-content .btn:last-child {
  margin-right: 0;
}

/* Close button */
.modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-muted);
  padding: var(--spacing-xs);
  border-radius: 50%;
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.modal-close:hover {
  background-color: var(--border-color);
  color: var(--text-color);
}

/* Responsive modal */
@media (max-width: 768px) {
  .modal-content {
    margin: var(--spacing-md);
    width: calc(100% - 2 * var(--spacing-md));
    max-width: none;
    padding: var(--spacing-lg);
  }
}
</style>
