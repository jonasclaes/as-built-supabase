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
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
	projectCreatePage: async ({ page }, use) => {
		await use(new ProjectCreatePage(page));
	},
	clientCreatePage: async ({ page }, use) => {
		await use(new ClientCreatePage(page));
	},
	loginFlow: async ({ loginPage }, use) => {
		await use(new LoginFlow(loginPage));
	},
	projectCreateFlow: async ({ projectCreatePage }, use) => {
		await use(new ProjectCreateFlow(projectCreatePage));
	},
	clientCreateFlow: async ({ clientCreatePage }, use) => {
		await use(new ClientCreateFlow(clientCreatePage));
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
