/**
 * Unit Tests for ValidationService
 */

import { describe, it, expect } from 'vitest';
import { validationService } from './validationService';

describe('ValidationService', () => {
  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validationService.isValidEmail('test@example.com')).toBe(true);
      expect(validationService.isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(validationService.isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validationService.isValidEmail('invalid')).toBe(false);
      expect(validationService.isValidEmail('invalid@')).toBe(false);
      expect(validationService.isValidEmail('@example.com')).toBe(false);
      expect(validationService.isValidEmail('invalid@domain')).toBe(false);
      expect(validationService.isValidEmail('')).toBe(false);
    });

    it('should return false for empty or null values', () => {
      expect(validationService.isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should return true for passwords meeting minimum length', () => {
      expect(validationService.isValidPassword('123456')).toBe(true);
      expect(validationService.isValidPassword('password123')).toBe(true);
    });

    it('should return false for passwords shorter than minimum length', () => {
      expect(validationService.isValidPassword('12345')).toBe(false);
      expect(validationService.isValidPassword('abc')).toBe(false);
    });

    it('should support custom minimum length', () => {
      expect(validationService.isValidPassword('1234', 4)).toBe(true);
      expect(validationService.isValidPassword('123', 4)).toBe(false);
      expect(validationService.isValidPassword('12345678', 8)).toBe(true);
    });

    it('should return false for empty passwords', () => {
      expect(validationService.isValidPassword('')).toBeFalsy();
    });
  });

  describe('isStrongPassword', () => {
    it('should return true for strong passwords', () => {
      expect(validationService.isStrongPassword('Password123')).toBe(true);
      expect(validationService.isStrongPassword('MyP@ssw0rd')).toBe(true);
      expect(validationService.isStrongPassword('Str0ngPass')).toBe(true);
    });

    it('should return false for passwords without uppercase', () => {
      expect(validationService.isStrongPassword('password123')).toBe(false);
    });

    it('should return false for passwords without lowercase', () => {
      expect(validationService.isStrongPassword('PASSWORD123')).toBe(false);
    });

    it('should return false for passwords without numbers', () => {
      expect(validationService.isStrongPassword('PasswordABC')).toBe(false);
    });

    it('should return false for passwords shorter than 8 characters', () => {
      expect(validationService.isStrongPassword('Pass12')).toBe(false);
    });

    it('should return false for empty passwords', () => {
      expect(validationService.isStrongPassword('')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should return true for valid phone numbers', () => {
      expect(validationService.isValidPhoneNumber('1234567890')).toBe(true);
      expect(validationService.isValidPhoneNumber('123-456-7890')).toBe(true);
      expect(validationService.isValidPhoneNumber('(123) 456-7890')).toBe(true);
      expect(validationService.isValidPhoneNumber('+1 234 567 8900')).toBe(true);
    });

    it('should return false for invalid phone numbers', () => {
      expect(validationService.isValidPhoneNumber('123')).toBe(false);
      expect(validationService.isValidPhoneNumber('abcdefghij')).toBe(false);
      expect(validationService.isValidPhoneNumber('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(validationService.isValidUrl('https://example.com')).toBe(true);
      expect(validationService.isValidUrl('http://example.com')).toBe(true);
      expect(validationService.isValidUrl('https://example.com/path?query=1')).toBe(true);
      expect(validationService.isValidUrl('ftp://files.example.com')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(validationService.isValidUrl('not-a-url')).toBe(false);
      expect(validationService.isValidUrl('example.com')).toBe(false);
      expect(validationService.isValidUrl('')).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('should return true for non-empty values', () => {
      expect(validationService.isRequired('text')).toBe(true);
      expect(validationService.isRequired(123)).toBe(true);
      expect(validationService.isRequired(true)).toBe(true);
      expect(validationService.isRequired(false)).toBe(true);
    });

    it('should return false for empty or null values', () => {
      expect(validationService.isRequired('')).toBe(false);
      expect(validationService.isRequired('   ')).toBe(false);
      expect(validationService.isRequired(null)).toBe(false);
      expect(validationService.isRequired(undefined)).toBe(false);
    });
  });

  describe('isLengthInRange', () => {
    it('should return true for values within range', () => {
      expect(validationService.isLengthInRange('hello', 3, 10)).toBe(true);
      expect(validationService.isLengthInRange('test', 4, 4)).toBe(true);
      expect(validationService.isLengthInRange('hi', 2, 5)).toBe(true);
    });

    it('should return false for values outside range', () => {
      expect(validationService.isLengthInRange('hi', 3, 10)).toBe(false);
      expect(validationService.isLengthInRange('very long string', 1, 5)).toBe(false);
      expect(validationService.isLengthInRange('', 1, 5)).toBe(false);
    });
  });

  describe('isNumberInRange', () => {
    it('should return true for numbers within range', () => {
      expect(validationService.isNumberInRange(5, 1, 10)).toBe(true);
      expect(validationService.isNumberInRange(1, 1, 10)).toBe(true);
      expect(validationService.isNumberInRange(10, 1, 10)).toBe(true);
    });

    it('should return false for numbers outside range', () => {
      expect(validationService.isNumberInRange(0, 1, 10)).toBe(false);
      expect(validationService.isNumberInRange(11, 1, 10)).toBe(false);
      expect(validationService.isNumberInRange(-5, 0, 10)).toBe(false);
    });
  });

  describe('matchesPattern', () => {
    it('should return true for values matching pattern', () => {
      expect(validationService.matchesPattern('abc123', /^[a-z0-9]+$/)).toBe(true);
      expect(validationService.matchesPattern('test@test.com', /^[^\s@]+@[^\s@]+\.[^\s@]+$/)).toBe(true);
    });

    it('should return false for values not matching pattern', () => {
      expect(validationService.matchesPattern('ABC', /^[a-z]+$/)).toBe(false);
      expect(validationService.matchesPattern('', /^[a-z]+$/)).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should remove HTML tags from strings', () => {
      expect(validationService.sanitizeString('<script>alert("xss")</script>')).toBe('alert("xss")');
      expect(validationService.sanitizeString('<p>Hello <b>World</b></p>')).toBe('Hello World');
      expect(validationService.sanitizeString('Plain text')).toBe('Plain text');
    });

    it('should return empty string for empty input', () => {
      expect(validationService.sanitizeString('')).toBe('');
    });
  });

  describe('isValidCreditCard', () => {
    it('should return true for valid credit card numbers (Luhn algorithm)', () => {
      expect(validationService.isValidCreditCard('4532015112830366')).toBe(true); // Visa
      expect(validationService.isValidCreditCard('6011111111111117')).toBe(true); // Discover
      expect(validationService.isValidCreditCard('5555 5555 5555 4444')).toBe(true); // Mastercard with spaces
    });

    it('should return false for invalid credit card numbers', () => {
      expect(validationService.isValidCreditCard('1234567890123456')).toBe(false);
      expect(validationService.isValidCreditCard('1234')).toBe(false);
      expect(validationService.isValidCreditCard('abcd-efgh-ijkl-mnop')).toBe(false);
      expect(validationService.isValidCreditCard('')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date strings', () => {
      expect(validationService.isValidDate('2023-12-31')).toBe(true);
      expect(validationService.isValidDate('2024-01-01')).toBe(true);
      expect(validationService.isValidDate('2000-02-29')).toBe(true); // Leap year
    });

    it('should return false for invalid date strings', () => {
      expect(validationService.isValidDate('2023/12/31')).toBe(false); // Wrong format
      expect(validationService.isValidDate('31-12-2023')).toBe(false); // Wrong format
      expect(validationService.isValidDate('2023-13-01')).toBe(false); // Invalid month
      expect(validationService.isValidDate('not-a-date')).toBe(false);
      expect(validationService.isValidDate('')).toBe(false);
    });
  });

  describe('isDateInPast', () => {
    it('should return true for past dates', () => {
      expect(validationService.isDateInPast('2020-01-01')).toBe(true);
      expect(validationService.isDateInPast('2000-12-31')).toBe(true);
    });

    it('should return false for future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const futureDateString = futureDate.toISOString().split('T')[0];
      expect(validationService.isDateInPast(futureDateString)).toBe(false);
    });
  });

  describe('isDateInFuture', () => {
    it('should return true for future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const futureDateString = futureDate.toISOString().split('T')[0];
      expect(validationService.isDateInFuture(futureDateString)).toBe(true);
    });

    it('should return false for past dates', () => {
      expect(validationService.isDateInFuture('2020-01-01')).toBe(false);
      expect(validationService.isDateInFuture('2000-12-31')).toBe(false);
    });
  });

  describe('isValidJSON', () => {
    it('should return true for valid JSON strings', () => {
      expect(validationService.isValidJSON('{"key": "value"}')).toBe(true);
      expect(validationService.isValidJSON('[]')).toBe(true);
      expect(validationService.isValidJSON('[1, 2, 3]')).toBe(true);
      expect(validationService.isValidJSON('null')).toBe(true);
    });

    it('should return false for invalid JSON strings', () => {
      expect(validationService.isValidJSON('{invalid}')).toBe(false);
      expect(validationService.isValidJSON("{'single': 'quotes'}")).toBe(false);
      expect(validationService.isValidJSON('not json')).toBe(false);
    });
  });

  describe('isValidHexColor', () => {
    it('should return true for valid hex color codes', () => {
      expect(validationService.isValidHexColor('#FFFFFF')).toBe(true);
      expect(validationService.isValidHexColor('#000000')).toBe(true);
      expect(validationService.isValidHexColor('#abc')).toBe(true);
      expect(validationService.isValidHexColor('#123456')).toBe(true);
    });

    it('should return false for invalid hex color codes', () => {
      expect(validationService.isValidHexColor('FFFFFF')).toBe(false); // Missing #
      expect(validationService.isValidHexColor('#GGGGGG')).toBe(false); // Invalid characters
      expect(validationService.isValidHexColor('#12')).toBe(false); // Too short
      expect(validationService.isValidHexColor('#1234567')).toBe(false); // Too long
      expect(validationService.isValidHexColor('')).toBe(false);
    });
  });

  describe('isValidIPv4', () => {
    it('should return true for valid IPv4 addresses', () => {
      expect(validationService.isValidIPv4('192.168.1.1')).toBe(true);
      expect(validationService.isValidIPv4('127.0.0.1')).toBe(true);
      expect(validationService.isValidIPv4('255.255.255.255')).toBe(true);
      expect(validationService.isValidIPv4('0.0.0.0')).toBe(true);
    });

    it('should return false for invalid IPv4 addresses', () => {
      expect(validationService.isValidIPv4('256.256.256.256')).toBe(false); // Out of range
      expect(validationService.isValidIPv4('192.168.1')).toBe(false); // Incomplete
      expect(validationService.isValidIPv4('192.168.1.1.1')).toBe(false); // Too many octets
      expect(validationService.isValidIPv4('abc.def.ghi.jkl')).toBe(false); // Non-numeric
      expect(validationService.isValidIPv4('')).toBe(false);
    });
  });

  describe('validate', () => {
    it('should validate object against rules', () => {
      const data = {
        email: 'test@example.com',
        password: 'Password123',
        age: 25,
      };

      const rules = {
        email: (val: string) => validationService.isValidEmail(val),
        password: (val: string) => validationService.isStrongPassword(val),
        age: (val: number) => validationService.isNumberInRange(val, 18, 100),
      };

      const result = validationService.validate(data, rules);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should return errors for invalid values', () => {
      const data = {
        email: 'invalid-email',
        password: 'weak',
        age: 10,
      };

      const rules = {
        email: (val: string) => validationService.isValidEmail(val) || 'Invalid email',
        password: (val: string) => validationService.isStrongPassword(val) || 'Weak password',
        age: (val: number) => validationService.isNumberInRange(val, 18, 100) || 'Age must be 18-100',
      };

      const result = validationService.validate(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Invalid email');
      expect(result.errors.password).toBe('Weak password');
      expect(result.errors.age).toBe('Age must be 18-100');
    });

    it('should handle mixed valid and invalid values', () => {
      const data = {
        email: 'test@example.com',
        password: 'weak',
      };

      const rules = {
        email: (val: string) => validationService.isValidEmail(val),
        password: (val: string) => validationService.isStrongPassword(val) || 'Weak password',
      };

      const result = validationService.validate(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeUndefined();
      expect(result.errors.password).toBe('Weak password');
    });
  });
});
