# Ticket Management App - Vue.js Version

A robust ticket management web application built with Vue.js 3 and Vue Router 4.

## Features

- **Landing Page**: Hero section with wavy background, decorative circles, and call-to-action buttons
- **Authentication**: Login and signup forms with validation and localStorage simulation
- **Dashboard**: Summary statistics and navigation to ticket management
- **Ticket CRUD**: Full create, read, update, delete functionality with form validation
- **Responsive Design**: Mobile and desktop optimized layouts
- **Consistent Styling**: Shared CSS for uniform design across implementations

## Frameworks and Libraries

- Vue.js 3
- Vue Router 4
- LocalStorage for data persistence

## Setup and Execution

1. Navigate to the Vue version directory:
   ```bash
   cd ticket-vue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run serve
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Switching Between Versions

This is the Vue.js implementation. To switch to other versions:

- **React**: Navigate to `../ticket-react` and run `npm start`
- **Twig**: Navigate to `../ticket-twig` and open `index.html` in a browser

## UI Components and State Structure

### Components
- `Landing.vue`: Hero section with CTA buttons
- `Auth.vue`: Login/signup forms with validation
- `Dashboard.vue`: Statistics display and logout
- `Tickets.vue`: CRUD interface with forms and list

### State Management
- Authentication state stored in localStorage (`ticketapp_session`)
- Tickets stored in localStorage (`ticketapp_tickets`)
- No external state management library used (kept simple)

## Accessibility

- Semantic HTML elements
- Form labels and ARIA attributes
- Keyboard navigation support
- Sufficient color contrast

## Test User Credentials

- Email: any valid email (e.g., test@example.com)
- Password: any non-empty password

## Known Issues

- Toast notifications use browser alerts for simplicity
- No real-time updates (localStorage based)
- Basic validation without advanced rules
# Ticket-Vue
