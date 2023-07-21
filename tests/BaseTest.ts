import { test as base, type Page } from '@playwright/test';
import { automationConfig } from '../automation.config';
import { DashboardPage } from './pages/DashboardPage';
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
	dashboardPage: DashboardPage;
	automationConfig: AutomationConfig;
}>({
	loginPage: async ({ page, context }, use) => {
		await use(new LoginPage(page, context));
	},
	dashboardPage: async ({ page, context }, use) => {
		await use(new DashboardPage(page, context));
	},
	automationConfig
});

export const attachScreenshot = async (page: Page) => {
	const screenshot = await page.screenshot();
	if (screenshot.length === 0) return;
	test.info().attach('screenshot', { body: screenshot, contentType: 'image/png' });
};

test.afterEach(async ({ page }) => {
	await attachScreenshot(page);
});
