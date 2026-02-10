/**
 * Unit Tests for ValidationService
 */

import { describe, it, expect } from 'vitest';
import { validationService } from '@/services/validation/validationService';

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
    it.each([
      ['Password123', true, 'valid strong password'],
      ['MyP@ssw0rd', true, 'password with special characters'],
      ['Str0ngPass', true, 'password with mixed case and numbers'],
      ['password123', false, 'password without uppercase'],
      ['PASSWORD123', false, 'password without lowercase'],
      ['PasswordABC', false, 'password without numbers'],
      ['Pass12', false, 'password shorter than 8 characters'],
      ['', false, 'empty password'],
    ])('should return %s for %s', (password, expected) => {
      expect(validationService.isStrongPassword(password)).toBe(expected);
    });
  });

  describe('isValidPhoneNumber', () => {
    it.each([
      ['1234567890', true, 'plain 10-digit number'],
      ['123-456-7890', true, 'number with dashes'],
      ['(123) 456-7890', true, 'number with parentheses'],
      ['+1 234 567 8900', true, 'international format'],
      ['123', false, 'too short'],
      ['abcdefghij', false, 'non-numeric'],
      ['', false, 'empty string'],
    ])('should return %s for %s', (phone, expected) => {
      expect(validationService.isValidPhoneNumber(phone)).toBe(expected);
    });
  });

  describe('isValidUrl', () => {
    it.each([
      ['https://example.com', true, 'HTTPS URL'],
      ['http://example.com', true, 'HTTP URL'],
      ['https://example.com/path?query=1', true, 'URL with path and query'],
      ['ftp://files.example.com', true, 'FTP URL'],
      ['not-a-url', false, 'invalid URL'],
      ['example.com', false, 'URL without protocol'],
      ['', false, 'empty string'],
    ])('should return %s for %s', (url, expected) => {
      expect(validationService.isValidUrl(url)).toBe(expected);
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
    it.each([
      ['#FFFFFF', true, '6-digit hex white'],
      ['#000000', true, '6-digit hex black'],
      ['#abc', true, '3-digit hex shorthand'],
      ['#123456', true, '6-digit hex color'],
      ['FFFFFF', false, 'missing # prefix'],
      ['#GGGGGG', false, 'invalid characters'],
      ['#12', false, 'too short'],
      ['#1234567', false, 'too long'],
      ['', false, 'empty string'],
    ])('should return %s for %s', (color, expected) => {
      expect(validationService.isValidHexColor(color)).toBe(expected);
    });
  });

  describe('isValidIPv4', () => {
    it.each([
      ['192.168.1.1', true, 'private IP'],
      ['127.0.0.1', true, 'localhost'],
      ['255.255.255.255', true, 'broadcast address'],
      ['0.0.0.0', true, 'zero address'],
      ['256.256.256.256', false, 'out of range'],
      ['192.168.1', false, 'incomplete'],
      ['192.168.1.1.1', false, 'too many octets'],
      ['abc.def.ghi.jkl', false, 'non-numeric'],
      ['', false, 'empty string'],
    ])('should return %s for %s', (ip, expected) => {
      expect(validationService.isValidIPv4(ip)).toBe(expected);
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
