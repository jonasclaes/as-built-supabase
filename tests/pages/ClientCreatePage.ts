import { expect, type Locator, type Page } from '@playwright/test';
import { NavBarPage } from './NavBarPage';

export class ClientCreatePage extends NavBarPage {
	public readonly inputClientCode: Locator;
	public readonly inputClientName: Locator;
	public readonly buttonCreate: Locator;

	constructor(page: Page) {
		super(page);

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

	public async waitForInteractive() {
		await this.inputClientCode.waitFor({
			state: 'visible'
		});
		await this.inputClientName.waitFor({
			state: 'visible'
		});
		await this.buttonCreate.waitFor({
			state: 'visible'
		});
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
