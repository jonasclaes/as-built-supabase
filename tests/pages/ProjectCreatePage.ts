import { expect, type BrowserContext, type Locator, type Page } from '@playwright/test';
import { NavBarPage } from './NavBarPage';

export class ProjectCreatePage extends NavBarPage {
	public readonly inputProjectCode: Locator;
	public readonly inputProjectName: Locator;
	public readonly inputClientName: Locator;
	public readonly buttonCreate: Locator;

	constructor(page: Page, context: BrowserContext) {
		super(page, context);

		this.inputProjectCode = page.getByPlaceholder('Project code');
		this.inputProjectName = page.getByPlaceholder('Project name');
		this.inputClientName = page.getByPlaceholder('Client');
		this.buttonCreate = page.getByRole('button', { name: 'Create' });
	}

	public async navigateTo() {
		await this.page.goto('/project');
	}

	public async waitFor() {
		await this.page.waitForURL('/project');
	}

	public async enterProjectCode(code: string) {
		await this.inputProjectCode.fill(code);
		await expect(this.inputProjectCode).toHaveValue(code);
	}

	public async enterProjectName(name: string) {
		await this.inputProjectName.fill(name);
		await expect(this.inputProjectName).toHaveValue(name);
	}

	public async enterClientName(clientName: string) {
		await this.inputClientName.fill(clientName);
		await expect(this.inputClientName).toHaveValue(clientName);
	}

	public async clickCreate() {
		await this.buttonCreate.click();
	}
}
