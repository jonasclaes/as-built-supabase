import type { BrowserContext, Locator, Page } from '@playwright/test';
import { NavBarPage } from './NavBarPage';

export class DashboardPage extends NavBarPage {
	public readonly textProjectsHeader: Locator;
	public readonly textClientsHeader: Locator;

	constructor(page: Page, context: BrowserContext) {
		super(page, context);

		this.textProjectsHeader = page.getByRole('heading', { name: 'Projects' });
		this.textClientsHeader = page.getByRole('heading', { name: 'Clients' });
	}

	public async navigateTo() {
		await this.page.goto('/');
	}
}
