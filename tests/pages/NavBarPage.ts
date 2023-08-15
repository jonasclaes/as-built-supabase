import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export abstract class NavBarPage extends BasePage {
	public readonly textAsBuiltHeader: Locator;
	public readonly buttonDashboard: Locator;
	public readonly buttonAccount: Locator;

	constructor(page: Page) {
		super(page);

		this.textAsBuiltHeader = page.getByRole('link', { name: 'AS-BUILT' });
		this.buttonDashboard = page
			.getByRole('list')
			.filter({ hasText: 'DashboardAccount' })
			.getByRole('link', { name: 'Dashboard' });
		this.buttonAccount = page
			.getByRole('list')
			.filter({ hasText: 'DashboardAccount' })
			.getByRole('link', { name: 'Account' });
	}
}
