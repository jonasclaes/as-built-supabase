import type { LoginPage } from '../pages/LoginPage';

export class LoginFlow {
	public readonly loginPage: LoginPage;

	constructor(loginPage: LoginPage) {
		this.loginPage = loginPage;
	}

	public async login(email: string, password: string) {
		await this.loginPage.navigateTo();
		await this.loginPage.waitForInteractive();
		await this.loginPage.enterEmail(email);
		await this.loginPage.enterPassword(password);
		await this.loginPage.clickSignIn();
	}
}
