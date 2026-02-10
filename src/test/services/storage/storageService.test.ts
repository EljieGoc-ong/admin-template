/**
 * Unit Tests for StorageService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storageService } from '@/services/storage/storageService';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  describe('setItem', () => {
    it('should set item in localStorage by default', () => {
      storageService.setItem('testKey', 'testValue');
      expect(localStorage.getItem('testKey')).toBe('testValue');
    });

    it('should set item in sessionStorage when specified', () => {
      storageService.setItem('testKey', 'testValue', sessionStorage);
      expect(sessionStorage.getItem('testKey')).toBe('testValue');
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockStorage = {
        setItem: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      storageService.setItem('testKey', 'testValue', mockStorage);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getItem', () => {
    it('should get item from localStorage by default', () => {
      localStorage.setItem('testKey', 'testValue');
      const value = storageService.getItem('testKey');
      expect(value).toBe('testValue');
    });

    it('should get item from sessionStorage when specified', () => {
      sessionStorage.setItem('testKey', 'testValue');
      const value = storageService.getItem('testKey', sessionStorage);
      expect(value).toBe('testValue');
    });

    it('should return null for non-existent key', () => {
      const value = storageService.getItem('nonExistent');
      expect(value).toBeNull();
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockStorage = {
        getItem: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      const value = storageService.getItem('testKey', mockStorage);

      expect(value).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('removeItem', () => {
    it('should remove item from localStorage by default', () => {
      localStorage.setItem('testKey', 'testValue');
      storageService.removeItem('testKey');
      expect(localStorage.getItem('testKey')).toBeNull();
    });

    it('should remove item from sessionStorage when specified', () => {
      sessionStorage.setItem('testKey', 'testValue');
      storageService.removeItem('testKey', sessionStorage);
      expect(sessionStorage.getItem('testKey')).toBeNull();
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockStorage = {
        removeItem: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      storageService.removeItem('testKey', mockStorage);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('clear', () => {
    it('should clear all items from localStorage by default', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      storageService.clear();
      expect(localStorage.length).toBe(0);
    });

    it('should clear all items from sessionStorage when specified', () => {
      sessionStorage.setItem('key1', 'value1');
      sessionStorage.setItem('key2', 'value2');
      storageService.clear(sessionStorage);
      expect(sessionStorage.length).toBe(0);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockStorage = {
        clear: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      storageService.clear(mockStorage);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getAllKeys', () => {
    it('should return all keys from localStorage', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');

      const keys = storageService.getAllKeys();

      expect(keys).toHaveLength(3);
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
    });

    it('should return empty array for empty storage', () => {
      const keys = storageService.getAllKeys();
      expect(keys).toHaveLength(0);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockStorage = {
        length: 1,
        key: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      const keys = storageService.getAllKeys(mockStorage);

      expect(keys).toHaveLength(0);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('setObject', () => {
    it('should store object as JSON string', () => {
      const obj = { name: 'John', age: 30 };
      storageService.setObject('user', obj);

      const stored = localStorage.getItem('user');
      expect(stored).toBe(JSON.stringify(obj));
    });

    it('should handle arrays', () => {
      const arr = [1, 2, 3, 4, 5];
      storageService.setObject('numbers', arr);

      const stored = localStorage.getItem('numbers');
      expect(stored).toBe(JSON.stringify(arr));
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const circularObj = {} as any;
      circularObj.self = circularObj;

      storageService.setObject('circular', circularObj);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getObject', () => {
    it('should retrieve and parse object from storage', () => {
      const obj = { name: 'John', age: 30 };
      localStorage.setItem('user', JSON.stringify(obj));

      const retrieved = storageService.getObject<typeof obj>('user');

      expect(retrieved).toEqual(obj);
    });

    it('should return null for non-existent key', () => {
      const retrieved = storageService.getObject('nonExistent');
      expect(retrieved).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('invalid', 'not-valid-json');

      const retrieved = storageService.getObject('invalid');

      expect(retrieved).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle arrays', () => {
      const arr = [1, 2, 3, 4, 5];
      localStorage.setItem('numbers', JSON.stringify(arr));

      const retrieved = storageService.getObject<typeof arr>('numbers');

      expect(retrieved).toEqual(arr);
    });
  });

  describe('hasItem', () => {
    it('should return true when item exists', () => {
      localStorage.setItem('testKey', 'testValue');
      expect(storageService.hasItem('testKey')).toBe(true);
    });

    it('should return false when item does not exist', () => {
      expect(storageService.hasItem('nonExistent')).toBe(false);
    });
  });

  describe('getStorageSize', () => {
    it('should calculate storage size in bytes', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');

      const size = storageService.getStorageSize();

      // key1 (4) + value1 (6) + key2 (4) + value2 (6) = 20
      expect(size).toBe(20);
    });

    it('should return 0 for empty storage', () => {
      const size = storageService.getStorageSize();
      expect(size).toBe(0);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockStorage = {
        length: 1,
        key: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      const size = storageService.getStorageSize(mockStorage);

      expect(size).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('setItemWithExpiry', () => {
    it('should store item with expiration time', () => {
      storageService.setItemWithExpiry('testKey', 'testValue', 60);

      const stored = localStorage.getItem('testKey');
      expect(stored).toBeDefined();

      const parsed = JSON.parse(stored!);
      expect(parsed.value).toBe('testValue');
      expect(parsed.expiry).toBeDefined();
      expect(typeof parsed.expiry).toBe('number');
    });
  });

  describe('getItemWithExpiry', () => {
    it('should retrieve non-expired item', () => {
      storageService.setItemWithExpiry('testKey', 'testValue', 60);

      const value = storageService.getItemWithExpiry('testKey');

      expect(value).toBe('testValue');
    });

    it('should return null for expired item', () => {
      const now = new Date();
      const expiredItem = {
        value: 'testValue',
        expiry: now.getTime() - 1000, // Expired 1 second ago
      };
      localStorage.setItem('expiredKey', JSON.stringify(expiredItem));

      const value = storageService.getItemWithExpiry('expiredKey');

      expect(value).toBeNull();
      expect(localStorage.getItem('expiredKey')).toBeNull(); // Should be removed
    });

    it('should return null for non-existent key', () => {
      const value = storageService.getItemWithExpiry('nonExistent');
      expect(value).toBeNull();
    });
  });

  describe('isStorageAvailable', () => {
    it('should return true for available localStorage', () => {
      expect(storageService.isStorageAvailable('localStorage')).toBe(true);
    });

    it('should return true for available sessionStorage', () => {
      expect(storageService.isStorageAvailable('sessionStorage')).toBe(true);
    });

    it('should return false when storage is not available', () => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('Storage not available');
      });

      const available = storageService.isStorageAvailable('localStorage');

      expect(available).toBe(false);

      Storage.prototype.setItem = originalSetItem;
    });
  });

  describe('migrate', () => {
    it('should migrate all keys from one storage to another', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');

      storageService.migrate(localStorage, sessionStorage);

      expect(sessionStorage.getItem('key1')).toBe('value1');
      expect(sessionStorage.getItem('key2')).toBe('value2');
      expect(sessionStorage.getItem('key3')).toBe('value3');
    });

    it('should migrate specific keys only', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');

      storageService.migrate(localStorage, sessionStorage, ['key1', 'key3']);

      expect(sessionStorage.getItem('key1')).toBe('value1');
      expect(sessionStorage.getItem('key2')).toBeNull();
      expect(sessionStorage.getItem('key3')).toBe('value3');
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockFromStorage = {
        length: 1,
        key: vi.fn(() => {
          throw new Error('Storage error');
        }),
      } as unknown as Storage;

      storageService.migrate(mockFromStorage, sessionStorage);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
