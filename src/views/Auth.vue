<template>
  <div class="container">
    <div class="card" style="max-width: 400px; margin: 50px auto;">
      <h2>{{ isLogin ? 'Login' : 'Signup' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :class="{ error: errors.email }"
          />
          <div v-if="errors.email" class="error">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            :class="{ error: errors.password }"
          />
          <div v-if="errors.password" class="error">{{ errors.password }}</div>
        </div>
        <button type="submit" class="btn btn-primary">{{ isLogin ? 'Login' : 'Signup' }}</button>
      </form>
      <p @click="toggleMode" style="cursor: pointer; margin-top: 20px;">
        {{ isLogin ? 'Need an account? Signup' : 'Already have an account? Login' }}
      </p>
    </div>
  </div>
</template>

<script>
import { login, signup } from '../utils/auth'

export default {
  name: 'AuthView',
  data() {
    return {
      isLogin: true,
      form: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin
      this.errors = {}
    },
    validateForm() {
      this.errors = {}
      if (!this.form.email) {
        this.errors.email = 'Email is required'
      }
      if (!this.form.password) {
        this.errors.password = 'Password is required'
      }
      return Object.keys(this.errors).length === 0
    },
    async handleSubmit() {
      if (!this.validateForm()) return

      const result = this.isLogin
        ? login(this.form.email, this.form.password)
        : signup(this.form.email, this.form.password)

      if (result.success) {
        this.showToast('success', this.isLogin ? 'Login successful' : 'Signup successful')
        this.$router.push('/dashboard')
      } else {
        this.showToast('error', result.error)
      }
    },
    showToast(type, message) {
      // Simple toast implementation
      alert(message)
    }
  }
}
</script>

<style scoped>
</style>
