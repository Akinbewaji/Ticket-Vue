<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
        <p class="auth-subtitle">{{ isLogin ? 'Sign in to your account' : 'Join our ticket management system' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <InputField
          id="email"
          v-model="form.email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          autocomplete="email"
          :error-message="errors.email"
        />

        <InputField
          id="password"
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          autocomplete="current-password"
          minlength="6"
          :error-message="errors.password"
        />

        <div class="password-strength" v-if="form.password && !isLogin">
          <div class="strength-meter">
            <div
              class="strength-fill"
              :class="passwordStrengthClass"
              :style="{ width: passwordStrengthWidth }"
            ></div>
          </div>
          <span class="strength-text">{{ passwordStrengthText }}</span>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary btn-full"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="spinner small"></span>
            {{ isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account') }}
          </button>
        </div>
      </form>

      <div class="auth-footer">
        <p class="auth-toggle">
          {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
          <button
            type="button"
            @click="toggleMode"
            class="link-button"
          >
            {{ isLogin ? 'Sign up' : 'Sign in' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { login, signup } from '../utils/auth'
import InputField from '../components/InputField.vue'

export default {
  name: 'AuthView',
  components: {
    InputField
  },
  data() {
    return {
      isLogin: true,
      isSubmitting: false,
      form: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    passwordStrength() {
      const password = this.form.password
      let score = 0

      if (password.length >= 8) score++
      if (/[a-z]/.test(password)) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++

      return score
    },
    passwordStrengthWidth() {
      return `${(this.passwordStrength / 5) * 100}%`
    },
    passwordStrengthClass() {
      const strength = this.passwordStrength
      if (strength <= 2) return 'weak'
      if (strength <= 3) return 'medium'
      return 'strong'
    },
    passwordStrengthText() {
      const strength = this.passwordStrength
      if (strength <= 2) return 'Weak'
      if (strength <= 3) return 'Medium'
      return 'Strong'
    }
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin
      this.errors = {}
      this.form = { email: '', password: '' }
    },
    validateForm() {
      this.errors = {}

      // Email validation
      if (!this.form.email) {
        this.errors.email = 'Email is required'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      }

      // Password validation
      if (!this.form.password) {
        this.errors.password = 'Password is required'
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
      } else if (!this.isLogin && this.passwordStrength < 3) {
        this.errors.password = 'Password is too weak. Please use a stronger password.'
      }

      return Object.keys(this.errors).length === 0
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    async handleSubmit() {
      if (!this.validateForm()) return

      this.isSubmitting = true

      try {
        const result = this.isLogin
          ? login(this.form.email, this.form.password)
          : signup(this.form.email, this.form.password)

        if (result.success) {
          this.showToast('success', this.isLogin ? 'Login successful' : 'Account created successfully')
          this.$router.push('/dashboard')
        } else {
          this.showToast('error', result.error)
        }
      } catch (error) {
        this.showToast('error', 'An unexpected error occurred. Please try again.')
      } finally {
        this.isSubmitting = false
      }
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
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-color) 0%, #667eea 50%, var(--accent-color) 100%);
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.05"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.auth-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: var(--spacing-xxl);
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
  border: 1px solid var(--border-color);
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.auth-title {
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 var(--spacing-sm) 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
}

.auth-form {
  margin-bottom: var(--spacing-lg);
}

.form-actions {
  margin-top: var(--spacing-xl);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.auth-footer {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.auth-toggle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
}

.link-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: inherit;
  font-weight: 600;
  text-decoration: underline;
  padding: 0;
  margin-left: var(--spacing-xs);
  transition: var(--transition-fast);
}

.link-button:hover {
  color: var(--accent-color);
  text-decoration: none;
}

/* Password Strength Indicator */
.password-strength {
  margin-top: var(--spacing-sm);
}

.strength-meter {
  width: 100%;
  height: 4px;
  background-color: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background-color: var(--danger-color);
}

.strength-fill.medium {
  background-color: var(--warning-color);
}

.strength-fill.strong {
  background-color: var(--success-color);
}

.strength-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

/* Error enhancements */
.error {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  font-size: 0.875rem;
  line-height: 1.4;
}

.error-icon {
  font-size: 0.9em;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Small spinner for buttons */
.spinner.small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--spacing-sm);
}

/* Responsive design */
@media (max-width: 480px) {
  .auth-container {
    padding: var(--spacing-md);
  }

  .auth-card {
    padding: var(--spacing-lg);
  }

  .auth-title {
    font-size: 1.75rem;
  }
}

/* Focus enhancements */
.auth-form input:focus + label,
.auth-form input:not(:placeholder-shown) + label {
  transform: translateY(-1.5rem) scale(0.85);
  color: var(--primary-color);
}

/* Dark mode adjustments */
[data-theme="dark"] .auth-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #4a4a4a 100%);
}
</style>
