import { expect, test } from '@playwright/test';

test('login page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
