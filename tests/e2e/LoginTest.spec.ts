import { expect } from '@playwright/test';
import { test } from '../BaseTest';

test.describe.configure({
	mode: 'parallel',
	retries: 3
});

test('Page loads', async ({ loginPage }) => {
	await test.step(`Navigate to login page`, async () => {
		await loginPage.navigateTo();
	});

	await test.step(`Verify 'AS-BUILT' header is displayed`, async () => {
		await expect(loginPage.textAsBuiltHeader).toBeVisible();
	});

	await test.step(`Verify 'Sign in' header is displayed`, async () => {
		await expect(loginPage.textSignInHeader).toBeVisible();
	});
});

test('Can login with valid credentials', async ({
	page,
	dashboardPage,
	loginFlow,
	automationConfig
}) => {
	await test.step(`Try logging in with a valid user`, async () => {
		const user = automationConfig.users.validUser;
		await loginFlow.login(user.email, user.password);
	});

	await test.step(`Verify dashboard page is displayed`, async () => {
		await expect(dashboardPage.textProjectsHeader).toBeVisible();
		await expect(dashboardPage.textClientsHeader).toBeVisible();
		await expect(page).toHaveURL('/');
	});
});

test('Cannot login with invalid credentials', async ({
	loginPage,
	loginFlow,
	automationConfig
}) => {
	await test.step(`Try logging in with an invalid user`, async () => {
		const user = automationConfig.users.invalidUser;
		await loginFlow.login(user.email, user.password);
	});

	await test.step(`Verify 'Invalid login credentials' is displayed`, async () => {
		await expect(loginPage.textInvalidCredentials).toBeVisible();
	});
});
