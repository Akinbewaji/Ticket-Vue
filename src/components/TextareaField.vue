<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :maxlength="maxlength"
      :rows="rows"
      :class="{ error: hasError }"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    ></textarea>
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
  name: 'TextareaField',
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
    rows: {
      type: Number,
      default: 4
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

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: var(--transition-fast);
}

.form-group textarea {
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
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.form-group textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-group textarea:hover {
  border-color: var(--primary-color);
}

.form-group textarea.error {
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
