import { test, expect } from '@playwright/test';

test.describe('E2E Dashboard flow', () => {
  test('should navigate to dashboard and render projects list', async ({ page }) => {
    // Mock navigating to login page
    await page.goto('/login');
    
    // Fill login inputs
    await page.fill('input[type="email"]', 'admin@universalwebtonative.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard page
    await expect(page).toHaveURL('/dashboard');
    
    // Check main dashboard components
    await expect(page.locator('h1')).toContainText('Projects');
  });
});
