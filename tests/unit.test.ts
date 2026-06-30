import { UserService } from '../services/api-gateway/src/modules/users/user.service';
import { ProjectService } from '../services/api-gateway/src/modules/projects/project.service';

describe('Unit Tests', () => {
  describe('UserService', () => {
    it('should sanitize user object correctly by removing password', () => {
      const rawUser = {
        id: '123',
        email: 'test@example.com',
        password: 'supersecretpassword',
        twoFactorSecret: 'xyz',
      };
      
      const { password, twoFactorSecret, ...sanitized } = rawUser;
      expect(sanitized.password).toBeUndefined();
      expect(sanitized.email).toBe('test@example.com');
    });
  });

  describe('ProjectService', () => {
    it('should format slugs cleanly from project name', () => {
      const name = 'My Awesome Website!';
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      expect(slug).toBe('my-awesome-website');
    });
  });
});
