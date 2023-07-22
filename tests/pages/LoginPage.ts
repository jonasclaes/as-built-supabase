import type { BrowserContext, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
	public readonly textAsBuiltHeader: Locator;
	public readonly textSignInHeader: Locator;
	public readonly inputEmail: Locator;
	public readonly inputPassword: Locator;
	public readonly buttonSignIn: Locator;
	public readonly textInvalidCredentials: Locator;

	constructor(page: Page, context: BrowserContext) {
		super(page, context);

		this.textAsBuiltHeader = page.getByRole('heading', { name: 'AS-BUILT' });
		this.textSignInHeader = page.getByRole('heading', { name: 'Sign in' });
		this.inputEmail = page.getByPlaceholder('Your email address');
		this.inputPassword = page.getByPlaceholder('Your password');
		this.buttonSignIn = page.getByRole('button', { name: 'Sign in', exact: true });
		this.textInvalidCredentials = page.getByText('Invalid login credentials');
	}

	public async navigateTo() {
		await this.page.goto('/auth/signIn');
	}

	public async waitFor() {
		await this.page.waitForURL('/auth/signIn');
	}

	public async enterEmail(email: string) {
		await this.inputEmail.fill(email);
	}

	public async enterPassword(password: string) {
		await this.inputPassword.fill(password);
	}

	public async clickSignIn() {
		await this.buttonSignIn.click();
	}
}
