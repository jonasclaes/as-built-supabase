import { expect, type BrowserContext, type Locator, type Page } from '@playwright/test';
import { NavBarPage } from './NavBarPage';

export class ClientCreatePage extends NavBarPage {
	public readonly inputClientCode: Locator;
	public readonly inputClientName: Locator;
	public readonly buttonCreate: Locator;

	constructor(page: Page, context: BrowserContext) {
		super(page, context);

		this.inputClientCode = page.getByPlaceholder('Client code');
		this.inputClientName = page.getByPlaceholder('Client name');
		this.buttonCreate = page.getByRole('button', { name: 'Create' });
	}

	public async navigateTo() {
		await this.page.goto('/client');
	}

	public async waitFor() {
		await this.page.waitForURL('/client');
	}

	public async enterClientCode(code: string) {
		await this.inputClientCode.fill(code);
		await expect(this.inputClientCode).toHaveValue(code);
	}

	public async enterClientName(name: string) {
		await this.inputClientName.fill(name);
		await expect(this.inputClientName).toHaveValue(name);
	}

	public async clickCreate() {
		await this.buttonCreate.click();
	}
}
