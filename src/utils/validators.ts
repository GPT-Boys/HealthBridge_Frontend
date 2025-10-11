/* eslint-disable @typescript-eslint/no-explicit-any */
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (password.length < 12) {
      errors.push('Mínimo 12 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Una letra mayúscula')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Una letra minúscula')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Un número')
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Un carácter especial')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8
  },

  required: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0
    }
    return value !== null && value !== undefined
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max
  },

  match: (value1: any, value2: any): boolean => {
    return value1 === value2
  },
}

export const validateForm = (formData: any, rules: any): { isValid: boolean; errors: any } => {
  const errors: any = {}
  let isValid = true

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field]
    const value = formData[field]

    fieldRules.forEach((rule: any) => {
      if (rule.validator && !rule.validator(value)) {
        if (!errors[field]) {
          errors[field] = []
        }
        errors[field].push(rule.message)
        isValid = false
      }
    })
  })

  return { isValid, errors }
}
