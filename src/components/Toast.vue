<template>
  <div v-if="show" class="toast" :class="type" @click="close">
    <div class="toast-content">
      <span class="toast-icon">{{ icon }}</span>
      <span class="toast-message">{{ message }}</span>
      <button class="toast-close" @click.stop="close" aria-label="Close notification">
        ×
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      show: false,
      timeoutId: null
    }
  },
  computed: {
    icon() {
      const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
      }
      return icons[this.type] || icons.info
    }
  },
  mounted() {
    this.show = true
    if (this.duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.close()
      }, this.duration)
    }
  },
  beforeUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  },
  methods: {
    close() {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
  padding: 0;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-hover);
  animation: slideInRight 0.3s ease-out;
  border-left: 4px solid;
  backdrop-filter: blur(10px);
}

.toast.success {
  background: var(--success-color);
  color: white;
  border-left-color: var(--success-color);
}

.toast.error {
  background: var(--danger-color);
  color: white;
  border-left-color: var(--danger-color);
}

.toast.warning {
  background: var(--warning-color);
  color: var(--text-color);
  border-left-color: var(--warning-color);
}

.toast.info {
  background: var(--info-color);
  color: white;
  border-left-color: var(--info-color);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
}

.toast-icon {
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-weight: 500;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .toast {
  backdrop-filter: blur(20px);
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .toast {
    left: 10px;
    right: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>
