<template>
  <div class="form-group" :class="{ 'floating-label': floatingLabel }">
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :class="{ error: hasError }"
      @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label v-if="floatingLabel" :for="id">{{ label }}</label>
    <div v-if="hasError" class="error">
      <span class="error-icon">⚠️</span>
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectField',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    required: {
      type: Boolean,
      default: false
    },
    floatingLabel: {
      type: Boolean,
      default: true
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasError() {
      return !!this.errorMessage
    }
  },
  emits: ['update:modelValue', 'blur', 'focus']
}
</script>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.form-group.floating-label label {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  pointer-events: none;
  background-color: var(--card-bg);
  padding: 0 var(--spacing-xs);
  transition: var(--transition-fast);
  z-index: 1;
  color: var(--text-muted);
}

.form-group.floating-label select:focus + label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--primary-color);
}

.form-group select {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: var(--font-family);
  background-color: var(--card-bg);
  color: var(--text-color);
  transition: var(--transition);
  outline: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--spacing-sm) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  appearance: none;
}

.form-group select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-group select:hover {
  border-color: var(--primary-color);
}

.form-group select.error {
  border-color: var(--danger-color);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error {
  color: var(--danger-color);
  font-size: 0.875rem;
  margin-top: var(--spacing-xs);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
