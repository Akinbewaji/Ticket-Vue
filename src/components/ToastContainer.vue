<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        @close="removeToast(toast.id)"
      />
    </transition-group>
  </div>
</template>

<script>
import Toast from './Toast.vue'

export default {
  name: 'ToastContainer',
  components: {
    Toast
  },
  data() {
    return {
      toasts: []
    }
  },
  methods: {
    addToast(message, type = 'info', duration = 5000) {
      const id = Date.now() + Math.random()
      this.toasts.push({
        id,
        message,
        type,
        duration
      })
    },
    removeToast(id) {
      const index = this.toasts.findIndex(toast => toast.id === id)
      if (index > -1) {
        this.toasts.splice(index, 1)
      }
    },
    showSuccess(message, duration) {
      this.addToast(message, 'success', duration)
    },
    showError(message, duration) {
      this.addToast(message, 'error', duration)
    },
    showWarning(message, duration) {
      this.addToast(message, 'warning', duration)
    },
    showInfo(message, duration) {
      this.addToast(message, 'info', duration)
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

.toast-container > div > * {
  pointer-events: auto;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
