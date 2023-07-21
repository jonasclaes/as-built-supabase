import { test as base } from '@playwright/test';
import { automationConfig } from '../automation.config';
import { LoginPage } from './pages/LoginPage';

export type AutomationConfig = {
	users: {
		validUser: User;
		invalidUser: User;
	};
};

export type User = {
	email: string;
	password: string;
};

export const test = base.extend<{
	loginPage: LoginPage;
	automationConfig: AutomationConfig;
}>({
	loginPage: async ({ page, context }, use) => {
		await use(new LoginPage(page, context));
	},
	automationConfig
});

test.afterEach(async ({ page }) => {
	const screenshot = await page.screenshot();
	if (screenshot.length === 0) return;
	test.info().attach('screenshot', { body: screenshot, contentType: 'image/png' });
});