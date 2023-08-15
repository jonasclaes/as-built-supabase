import type { Locator, Page } from '@playwright/test';
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
	public readonly tableClients: Locator;
	public readonly divStatTotalProjects: Locator;
	public readonly divStatTotalClients: Locator;

	constructor(page: Page) {
		super(page);

		this.textProjectsHeader = page.getByRole('heading', { name: 'Projects' });
		this.textClientsHeader = page.getByRole('heading', { name: 'Clients' });
		this.buttonNewProject = page.getByRole('link', { name: 'New project' });
		this.buttonNewClient = page.getByRole('link', { name: 'New client' });
		this.inputProjectSearch = page.locator('input[name="projectSearch"]');
		this.inputClientSearch = page.locator('input[name="clientSearch"]');
		this.buttonProjectSearch = page.getByRole('button', { name: 'Search' }).nth(0);
		this.buttonClientSearch = page.getByRole('button', { name: 'Search' }).nth(1);
		this.tableProjects = page.getByTestId('projectsTable');
		this.tableClients = page.getByTestId('clientsTable');
		this.divStatTotalProjects = page.getByTestId('statTotalProjects');
		this.divStatTotalClients = page.getByTestId('statTotalClients');
	}

	public async navigateTo() {
		await this.page.goto('/');
	}

	public async waitFor() {
		await this.page.waitForURL('/');
	}

	public async clickNewProject() {
		await this.buttonNewProject.click();
	}

	public async getAmountOfProjects(): Promise<number> {
		if (await this.tableProjects.isHidden()) return 0;
		return await this.tableProjects.locator('tbody').locator('tr').count();
	}

	public async getAmountOfClients(): Promise<number> {
		if (await this.tableClients.isHidden()) return 0;
		return await this.tableClients.locator('tbody').locator('tr').count();
	}

	public async deleteAllProjects() {
		while ((await this.getAmountOfProjects()) > 0) {
			await this.tableProjects.getByRole('link', { name: 'Details' }).first().click();
			await this.page.getByRole('button', { name: 'Delete' }).click();
			await this.page.waitForURL('/');
		}
	}

	public async deleteAllClients() {
		while ((await this.getAmountOfClients()) > 0) {
			await this.tableClients.getByRole('link', { name: 'Details' }).first().click();
			await this.page.getByRole('button', { name: 'Delete' }).click();
			await this.page.waitForURL('/');
		}
	}
}
