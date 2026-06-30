import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Check subscription plan permissions
    const planPermissions = this.getPlanPermissions(user.plan);
    const hasPermission = requiredPermissions.every(p => planPermissions.includes(p));

    if (!hasPermission) {
      throw new ForbiddenException('Plan does not include this feature');
    }

    return true;
  }

  private getPlanPermissions(plan: string): string[] {
    const permissions: Record<string, string[]> = {
      FREE: ['project:create', 'project:read', 'build:limited'],
      STARTER: ['project:create', 'project:read', 'project:update', 'build:create'],
      PROFESSIONAL: ['project:*', 'build:*', 'team:read', 'analytics:read'],
      BUSINESS: ['project:*', 'build:*', 'team:*', 'analytics:*', 'api:access'],
      ENTERPRISE: ['*'],
    };
    return permissions[plan] || permissions.FREE;
  }
}
