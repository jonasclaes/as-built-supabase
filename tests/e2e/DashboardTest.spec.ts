import { expect } from '@playwright/test';
import { test } from '../BaseTest';

test.describe.configure({
	retries: 3
});

test.beforeEach(async ({ loginFlow, dashboardPage, automationConfig }) => {
	const user = automationConfig.users.validUser;
	await loginFlow.login(user.email, user.password);
	await dashboardPage.waitFor();
});

test.afterEach(async ({ dashboardPage }) => {
	await dashboardPage.deleteAllProjects();
	await dashboardPage.deleteAllClients();
});

test('Page loads', async ({ dashboardPage }) => {
	await test.step(`Navigate to dashboard page`, async () => {
		await dashboardPage.navigateTo();
	});

	await test.step(`Verify 'Projects' header is displayed`, async () => {
		await expect(dashboardPage.textProjectsHeader).toBeVisible();
	});

	await test.step(`Verify 'Clients' header is displayed`, async () => {
		await expect(dashboardPage.textClientsHeader).toBeVisible();
	});
});

test('Page has 3 projects', async ({ page, dashboardPage, projectCreateFlow }) => {
	const projects = [...Array(3).keys()].map((item) => {
		return {
			code: `2023-00${item}`,
			name: `Project ${item}`,
			client: ''
		};
	});

	await test.step(`Navigate to dashboard page`, async () => {
		await dashboardPage.navigateTo();
	});

	await test.step(`Create projects`, async () => {
		for (const project of projects) {
			await projectCreateFlow.createProject(project.code, project.name, project.client);
			await page.waitForURL('/project/*');
		}

		await dashboardPage.navigateTo();
	});

	await test.step(`Verify that the page has 3 projects`, async () => {
		expect(await dashboardPage.getAmountOfProjects()).toEqual(3);
	});

	await test.step(`Verify that the page has 3 projects in the statistics field`, async () => {
		expect(dashboardPage.divStatTotalProjects.locator(`div[class='stat-value']`)).toHaveText('3');
	});
});

test('Page has 3 clients', async ({ page, dashboardPage, clientCreateFlow }) => {
	const clients = [...Array(3).keys()].map((item) => {
		return {
			code: `00${item}`,
			name: `Client ${item}`
		};
	});

	await test.step(`Navigate to dashboard page`, async () => {
		await dashboardPage.navigateTo();
	});

	await test.step(`Create clients`, async () => {
		for (const client of clients) {
			await clientCreateFlow.createClient(client.code, client.name);
			await page.waitForURL('/client/*');
		}

		await dashboardPage.navigateTo();
	});

	await test.step(`Verify that the page has 3 clients`, async () => {
		expect(await dashboardPage.getAmountOfClients()).toEqual(3);
	});

	await test.step(`Verify that the page has 3 clients in the statistics field`, async () => {
		expect(dashboardPage.divStatTotalClients.locator(`div[class='stat-value']`)).toHaveText('3');
	});
});
