import type { Page } from '@playwright/test';

export abstract class BasePage {
	public readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
