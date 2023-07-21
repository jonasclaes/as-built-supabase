import type { BrowserContext } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';

export class LoginFlow {
	public readonly loginPage: LoginPage;
	public readonly context: BrowserContext;

	constructor(loginPage: LoginPage, context: BrowserContext) {
		this.loginPage = loginPage;
		this.context = context;
	}

	public async login(email: string, password: string) {
		await this.loginPage.navigateTo();
		await this.loginPage.enterEmail(email);
		await this.loginPage.enterPassword(password);
		await this.loginPage.clickSignIn();
	}
}
