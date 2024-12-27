import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display the login form', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.locator('h2.text-center')).toHaveText('Iniciar Sesión');
  });
});