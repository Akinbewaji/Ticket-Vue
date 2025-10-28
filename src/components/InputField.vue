<template>
  <div class="form-group" :class="{ 'floating-label': floatingLabel }">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="floatingLabel ? ' ' : placeholder"
      :required="required"
      :maxlength="maxlength"
      :class="{ error: hasError }"
      :autocomplete="autocomplete"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <label v-if="floatingLabel" :for="id">{{ label }}</label>
    <div v-if="hasError" class="error">
      <span class="error-icon">⚠️</span>
      {{ errorMessage }}
    </div>
    <div v-if="maxlength && modelValue" class="char-count">
      {{ modelValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
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
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: null
    },
    floatingLabel: {
      type: Boolean,
      default: true
    },
    errorMessage: {
      type: String,
      default: ''
    },
    autocomplete: {
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

.form-group.floating-label input:focus + label,
.form-group.floating-label input:not(:placeholder-shown) + label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--primary-color);
}

.form-group input {
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
}

.form-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-group input:hover {
  border-color: var(--primary-color);
}

.form-group input.error {
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

.char-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: right;
  margin-top: var(--spacing-xs);
}
</style>
