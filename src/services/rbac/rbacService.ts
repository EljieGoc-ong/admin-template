/**
 * RBAC Service
 * Permission-Based Access Control business logic
 */

import { Permission, Action, PermissionCheck } from '@/types/rbac';
import { parsePermission } from '@/config/permissions';

class RBACService {
  /**
   * Check if user has specific permission
   */
  hasPermission(
    userPermissions: Permission[],
    feature: string,
    action: Action
  ): boolean {
    const requiredPermission = `${feature}:${action}`;
    return userPermissions.includes(requiredPermission);
  }

  /**
   * Check if user has the exact permission string
   */
  checkPermission(userPermissions: Permission[], permission: Permission): boolean {
    return userPermissions.includes(permission);
  }

  /**
   * Check if user has ANY of the specified permissions
   */
  hasAnyPermission(
    userPermissions: Permission[],
    requiredPermissions: Permission[]
  ): boolean {
    return requiredPermissions.some(permission =>
      userPermissions.includes(permission)
    );
  }

  /**
   * Check if user has ALL of the specified permissions
   */
  hasAllPermissions(
    userPermissions: Permission[],
    requiredPermissions: Permission[]
  ): boolean {
    return requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );
  }

  /**
   * Check if user can access a specific route
   */
  canAccessRoute(
    userPermissions: Permission[],
    path: string,
    routePermissions: Record<string, { requiredPermissions: Permission[]; requireAll?: boolean }>
  ): boolean {
    const routeConfig = routePermissions[path];
    
    if (!routeConfig) {
      // No specific restrictions, allow access
      return true;
    }

    const { requiredPermissions, requireAll = false } = routeConfig;

    if (requireAll) {
      return this.hasAllPermissions(userPermissions, requiredPermissions);
    } else {
      return this.hasAnyPermission(userPermissions, requiredPermissions);
    }
  }

  /**
   * Get all features user has access to
   */
  getUserFeatures(userPermissions: Permission[]): string[] {
    const features = new Set<string>();
    
    userPermissions.forEach(permission => {
      const { feature } = parsePermission(permission);
      features.add(feature);
    });
    
    return Array.from(features);
  }

  /**
   * Get user's actions for a specific feature
   */
  getFeatureActions(userPermissions: Permission[], feature: string): Action[] {
    const actions = new Set<Action>();
    
    userPermissions.forEach(permission => {
      const parsed = parsePermission(permission);
      if (parsed.feature === feature) {
        actions.add(parsed.action as Action);
      }
    });
    
    return Array.from(actions);
  }

  /**
   * Check if user has write access to a feature
   */
  canWrite(userPermissions: Permission[], feature: string): boolean {
    return this.hasPermission(userPermissions, feature, Action.WRITE);
  }

  /**
   * Check if user has read access to a feature
   */
  canRead(userPermissions: Permission[], feature: string): boolean {
    return this.hasPermission(userPermissions, feature, Action.READ);
  }

  /**
   * Filter data based on write permissions
   */
  filterByWritePermission<T extends { feature?: string }>(
    userPermissions: Permission[],
    items: T[]
  ): T[] {
    return items.filter(item => {
      if (!item.feature) return true;
      return this.canWrite(userPermissions, item.feature);
    });
  }

  /**
   * Get visible UI elements based on permissions
   */
  getVisibleElements(
    userPermissions: Permission[],
    elements: Array<{
      key: string;
      requiredPermissions: Permission[];
      requireAll?: boolean;
    }>
  ): string[] {
    return elements
      .filter(element => {
        const { requiredPermissions, requireAll = false } = element;
        
        if (requireAll) {
          return this.hasAllPermissions(userPermissions, requiredPermissions);
        } else {
          return this.hasAnyPermission(userPermissions, requiredPermissions);
        }
      })
      .map(e => e.key);
  }

  /**
   * Validate permissions array
   */
  validatePermissions(permissions: Permission[]): {
    valid: boolean;
    invalidPermissions: string[];
  } {
    const invalidPermissions: string[] = [];
    
    permissions.forEach(permission => {
      if (!permission.includes(':')) {
        invalidPermissions.push(permission);
      } else {
        const [feature, action] = permission.split(':');
        if (!feature || !action) {
          invalidPermissions.push(permission);
        }
        if (action !== 'read' && action !== 'write') {
          invalidPermissions.push(permission);
        }
      }
    });
    
    return {
      valid: invalidPermissions.length === 0,
      invalidPermissions,
    };
  }

  /**
   * Get permission label for UI display
   */
  getPermissionLabel(permission: Permission): string {
    const { feature, action } = parsePermission(permission);
    const featureLabel = feature
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const actionLabel = action.charAt(0).toUpperCase() + action.slice(1);
    
    return `${featureLabel} - ${actionLabel}`;
  }

  /**
   * Group permissions by feature
   */
  groupPermissionsByFeature(permissions: Permission[]): Record<string, Action[]> {
    const grouped: Record<string, Action[]> = {};
    
    permissions.forEach(permission => {
      const { feature, action } = parsePermission(permission);
      if (!grouped[feature]) {
        grouped[feature] = [];
      }
      grouped[feature].push(action as Action);
    });
    
    return grouped;
  }

  /**
   * Check if permissions set includes admin access
   * (has write access to critical features)
   */
  hasAdminAccess(userPermissions: Permission[]): boolean {
    const adminPermissions = [
      'users:write',
      'settings:write',
      'administration:read',
    ];
    
    return adminPermissions.some(permission =>
      userPermissions.includes(permission)
    );
  }

  /**
   * Check if permissions set is read-only for a feature
   */
  isReadOnly(userPermissions: Permission[], feature: string): boolean {
    return (
      this.canRead(userPermissions, feature) &&
      !this.canWrite(userPermissions, feature)
    );
  }
}

export const rbacService = new RBACService();
