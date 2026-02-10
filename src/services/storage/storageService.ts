/**
 * Storage Service
 * Wrapper around localStorage and sessionStorage with error handling
 */

type StorageType = Storage;

class StorageService {
  /**
   * Set item in storage
   */
  setItem(key: string, value: string, storage: StorageType = localStorage): void {
    try {
      storage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item in storage:`, error);
      // Handle quota exceeded or other storage errors
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        this.clearOldItems(storage);
        try {
          storage.setItem(key, value);
        } catch (retryError) {
          console.error(`Retry failed:`, retryError);
        }
      }
    }
  }

  /**
   * Get item from storage
   */
  getItem(key: string, storage: StorageType = localStorage): string | null {
    try {
      return storage.getItem(key);
    } catch (error) {
      console.error(`Error getting item from storage:`, error);
      return null;
    }
  }

  /**
   * Remove item from storage
   */
  removeItem(key: string, storage: StorageType = localStorage): void {
    try {
      storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage:`, error);
    }
  }

  /**
   * Clear all items from storage
   */
  clear(storage: StorageType = localStorage): void {
    try {
      storage.clear();
    } catch (error) {
      console.error(`Error clearing storage:`, error);
    }
  }

  /**
   * Get all keys from storage
   */
  getAllKeys(storage: StorageType = localStorage): string[] {
    try {
      const keys: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key) keys.push(key);
      }
      return keys;
    } catch (error) {
      console.error(`Error getting storage keys:`, error);
      return [];
    }
  }

  /**
   * Set object in storage (automatically JSON stringified)
   */
  setObject<T>(key: string, value: T, storage: StorageType = localStorage): void {
    try {
      const serialized = JSON.stringify(value);
      this.setItem(key, serialized, storage);
    } catch (error) {
      console.error(`Error setting object in storage:`, error);
    }
  }

  /**
   * Get object from storage (automatically JSON parsed)
   */
  getObject<T>(key: string, storage: StorageType = localStorage): T | null {
    try {
      const item = this.getItem(key, storage);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting object from storage:`, error);
      return null;
    }
  }

  /**
   * Check if key exists in storage
   */
  hasItem(key: string, storage: StorageType = localStorage): boolean {
    return this.getItem(key, storage) !== null;
  }

  /**
   * Get storage size in bytes
   */
  getStorageSize(storage: StorageType = localStorage): number {
    let size = 0;
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key) {
          const value = storage.getItem(key);
          if (value) {
            size += key.length + value.length;
          }
        }
      }
    } catch (error) {
      console.error(`Error calculating storage size:`, error);
    }
    return size;
  }

  /**
   * Clear old items (items with timestamps older than specified days)
   */
  private clearOldItems(storage: StorageType, daysOld: number = 30): void {
    try {
      const now = Date.now();
      const cutoff = daysOld * 24 * 60 * 60 * 1000;
      
      for (let i = storage.length - 1; i >= 0; i--) {
        const key = storage.key(i);
        if (key && key.includes('_timestamp')) {
          const timestampStr = storage.getItem(key);
          if (timestampStr) {
            const timestamp = parseInt(timestampStr, 10);
            if (now - timestamp > cutoff) {
              const dataKey = key.replace('_timestamp', '');
              storage.removeItem(dataKey);
              storage.removeItem(key);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error clearing old items:`, error);
    }
  }

  /**
   * Set item with expiration
   */
  setItemWithExpiry(
    key: string,
    value: string,
    expiryInMinutes: number,
    storage: StorageType = localStorage
  ): void {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000,
    };
    this.setObject(key, item, storage);
  }

  /**
   * Get item with expiration check
   */
  getItemWithExpiry(key: string, storage: StorageType = localStorage): string | null {
    const item = this.getObject<{ value: string; expiry: number }>(key, storage);
    
    if (!item) return null;
    
    const now = new Date();
    if (now.getTime() > item.expiry) {
      this.removeItem(key, storage);
      return null;
    }
    
    return item.value;
  }

  /**
   * Check if storage is available
   */
  isStorageAvailable(type: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Migrate data from one storage to another
   */
  migrate(fromStorage: StorageType, toStorage: StorageType, keys?: string[]): void {
    try {
      const keysToMigrate = keys || this.getAllKeys(fromStorage);
      
      keysToMigrate.forEach(key => {
        const value = this.getItem(key, fromStorage);
        if (value !== null) {
          this.setItem(key, value, toStorage);
        }
      });
    } catch (error) {
      console.error(`Error migrating storage:`, error);
    }
  }
}

export const storageService = new StorageService();
