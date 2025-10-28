<template>
  <div class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Ticket Management System</h1>
        <p>Streamline your support workflow with our powerful ticket management platform.</p>
        <div class="cta-buttons">
          <router-link to="/auth" class="btn btn-primary">LOGIN</router-link>
          <router-link to="/auth" class="btn btn-secondary">GET STARTED</router-link>
        </div>
      </div>
    </div>
    <div class="wave"></div>
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
  </div>
  <div class="section">
    <div class="container">
      <div class="grid">
        <div class="card">
          <h3>Easy Ticket Creation</h3>
          <p>Create and manage tickets effortlessly.</p>
        </div>
        <div class="card">
          <h3>Real-time Updates</h3>
          <p>Stay updated with instant notifications.</p>
        </div>
        <div class="card">
          <h3>Comprehensive Dashboard</h3>
          <p>Monitor all your tickets in one place.</p>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Ticket Management System. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LandingView'
}
</script>

<style scoped>
</style>
