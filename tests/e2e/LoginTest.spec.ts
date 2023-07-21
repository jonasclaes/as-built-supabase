import { expect } from '@playwright/test';
import { test } from '../BaseTest';

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

test('Can login with valid credentials', async ({ page, loginPage, automationConfig }) => {
	await test.step(`Navigate to login page`, async () => {
		await loginPage.navigateTo();
	});

	await test.step(`Enter a valid email`, async () => {
		await loginPage.enterEmail(automationConfig.users.validUser.email);
	});

	await test.step(`Enter a valid password`, async () => {
		await loginPage.enterPassword(automationConfig.users.validUser.password);
	});

	await test.step(`Click sign in button`, async () => {
		await loginPage.clickSignIn();
	});

	await test.step(`Verify dashboard page is displayed`, async () => {
		await expect(page).toHaveURL('/');
	});
});

test('Cannot login with invalid credentials', async ({ loginPage, automationConfig }) => {
	await test.step(`Navigate to login page`, async () => {
		await loginPage.navigateTo();
	});

	await test.step(`Enter a valid email`, async () => {
		await loginPage.enterEmail(automationConfig.users.invalidUser.email);
	});

	await test.step(`Enter a valid password`, async () => {
		await loginPage.enterPassword(automationConfig.users.invalidUser.password);
	});

	await test.step(`Click sign in button`, async () => {
		await loginPage.clickSignIn();
	});

	await test.step(`Verify 'Invalid login credentials' is displayed`, async () => {
		await expect(loginPage.textInvalidCredentials).toBeVisible();
	});
});
