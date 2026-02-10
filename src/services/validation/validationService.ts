/**
 * Validation Service
 * Centralized validation logic for forms and data
 */

class ValidationService {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    if (!email) return false;
    
    // Prevent ReDoS by limiting input length (RFC 5321)
    if (email.length > 254) return false;
    
    // More specific regex pattern that's resistant to backtracking
    // Uses bounded quantifiers and specific character classes
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password length
   */
  isValidPassword(password: string, minLength: number = 6): boolean {
    return password && password.length >= minLength;
  }

  /**
   * Check if password is strong (has uppercase, lowercase, and numbers)
   */
  isStrongPassword(password: string): boolean {
    if (!password) return false;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && password.length >= 8;
  }

  /**
   * Validate phone number
   */
  isValidPhoneNumber(phone: string): boolean {
    if (!phone) return false;
    
    // Simple validation - accepts various formats
    const phoneRegex = /^[\d\s\-+()]+$/;
    const cleaned = phone.replace(/[\s\-()]/g, '');
    
    return phoneRegex.test(phone) && cleaned.length >= 10;
  }

  /**
   * Validate URL format
   */
  isValidUrl(url: string): boolean {
    if (!url) return false;
    
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate required field
   */
  isRequired(value: string | number | boolean | null | undefined): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  }

  /**
   * Validate string length range
   */
  isLengthInRange(value: string, min: number, max: number): boolean {
    if (!value) return false;
    const length = value.length;
    return length >= min && length <= max;
  }

  /**
   * Validate number range
   */
  isNumberInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  /**
   * Validate that value matches pattern
   */
  matchesPattern(value: string, pattern: RegExp): boolean {
    if (!value) return false;
    return pattern.test(value);
  }

  /**
   * Sanitize string (remove HTML tags)
   */
  sanitizeString(value: string): string {
    if (!value) return '';
    
    // Prevent ReDoS by limiting input length
    if (value.length > 10000) {
      value = value.substring(0, 10000);
    }
    
    // Use bounded quantifier to prevent catastrophic backtracking
    // Limit tag content to 1000 characters max
    return value.replace(/<[^>]{0,1000}>/g, '');
  }

  /**
   * Validate credit card number (Luhn algorithm)
   */
  isValidCreditCard(cardNumber: string): boolean {
    if (!cardNumber) return false;
    
    const cleaned = cardNumber.replace(/[\s-]/g, '');
    
    if (!/^\d+$/.test(cleaned)) return false;
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  /**
   * Validate date format (YYYY-MM-DD)
   */
  isValidDate(dateString: string): boolean {
    if (!dateString) return false;
    
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  /**
   * Check if date is in the past
   */
  isDateInPast(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
  }

  /**
   * Check if date is in the future
   */
  isDateInFuture(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  }

  /**
   * Validate JSON string
   */
  isValidJSON(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate hex color code
   */
  isValidHexColor(color: string): boolean {
    if (!color) return false;
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  }

  /**
   * Validate IP address (IPv4)
   */
  isValidIPv4(ip: string): boolean {
    if (!ip) return false;
    
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    
    return parts.every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  }

  /**
   * Create validation schema helper
   */
  validate<T extends Record<string, unknown>>(
    data: T,
    rules: Record<keyof T, (value: unknown) => boolean | string>
  ): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
    const errors: Partial<Record<keyof T, string>> = {};
    
    for (const [field, validator] of Object.entries(rules)) {
      const result = validator(data[field as keyof T]);
      
      if (result !== true) {
        errors[field as keyof T] = typeof result === 'string' ? result : 'Invalid value';
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

export const validationService = new ValidationService();
