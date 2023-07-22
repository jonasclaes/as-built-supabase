import { test as base, type Page } from '@playwright/test';
import { automationConfig } from '../automation.config';
import { ClientCreateFlow } from './flows/ClientCreateFlow';
import { LoginFlow } from './flows/LoginFlow';
import { ProjectCreateFlow } from './flows/ProjectCreateFlow';
import { ClientCreatePage } from './pages/ClientCreatePage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProjectCreatePage } from './pages/ProjectCreatePage';

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
	// Pages
	loginPage: LoginPage;
	dashboardPage: DashboardPage;
	projectCreatePage: ProjectCreatePage;
	clientCreatePage: ClientCreatePage;

	// Flows
	loginFlow: LoginFlow;
	projectCreateFlow: ProjectCreateFlow;
	clientCreateFlow: ClientCreateFlow;

	// Config
	automationConfig: AutomationConfig;
}>({
	loginPage: async ({ page, context }, use) => {
		await use(new LoginPage(page, context));
	},
	dashboardPage: async ({ page, context }, use) => {
		await use(new DashboardPage(page, context));
	},
	projectCreatePage: async ({ page, context }, use) => {
		await use(new ProjectCreatePage(page, context));
	},
	clientCreatePage: async ({ page, context }, use) => {
		await use(new ClientCreatePage(page, context));
	},
	loginFlow: async ({ loginPage, context }, use) => {
		await use(new LoginFlow(loginPage, context));
	},
	projectCreateFlow: async ({ projectCreatePage, context }, use) => {
		await use(new ProjectCreateFlow(projectCreatePage, context));
	},
	clientCreateFlow: async ({ clientCreatePage, context }, use) => {
		await use(new ClientCreateFlow(clientCreatePage, context));
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
