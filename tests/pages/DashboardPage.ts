import type { BrowserContext, Locator, Page } from '@playwright/test';
import { NavBarPage } from './NavBarPage';

export class DashboardPage extends NavBarPage {
	public readonly textProjectsHeader: Locator;
	public readonly textClientsHeader: Locator;
	public readonly buttonNewProject: Locator;
	public readonly buttonNewClient: Locator;
	public readonly inputProjectSearch: Locator;
	public readonly inputClientSearch: Locator;
	public readonly buttonProjectSearch: Locator;
	public readonly buttonClientSearch: Locator;
	public readonly tableProjects: Locator;

	constructor(page: Page, context: BrowserContext) {
		super(page, context);

		this.textProjectsHeader = page.getByRole('heading', { name: 'Projects' });
		this.textClientsHeader = page.getByRole('heading', { name: 'Clients' });
		this.buttonNewProject = page.getByRole('link', { name: 'New project' });
		this.buttonNewClient = page.getByRole('link', { name: 'New client' });
		this.inputProjectSearch = page.locator('input[name="projectSearch"]');
		this.inputClientSearch = page.locator('input[name="clientSearch"]');
		this.buttonProjectSearch = page.getByRole('button', { name: 'Search' }).nth(0);
		this.buttonClientSearch = page.getByRole('button', { name: 'Search' }).nth(1);
		this.tableProjects = page.getByTestId('projectsTable')
	}

	public async navigateTo() {
		await this.page.goto('/');
	}

	public async waitFor() {
		await this.page.waitForURL('/')
	}

	public async clickNewProject() {
		await this.buttonNewProject.click();
	}

	public async getAmountOfProjects(): Promise<number> {
		if (await this.tableProjects.isHidden()) return 0;
		return await this.tableProjects.locator('tbody').locator('tr').count()
	}

	public async deleteAllProjects() {
		while (await this.getAmountOfProjects() > 0) {
			await this.tableProjects.getByRole('link', { name: 'Details' }).first().click()
			await this.page.getByRole('button', { name: 'Delete' }).click();
			await this.page.waitForURL('/')
		}
	}
}
