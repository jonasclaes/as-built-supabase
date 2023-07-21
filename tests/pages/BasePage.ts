import type { BrowserContext, Page } from '@playwright/test';

export class BasePage {
	public readonly page: Page;
	public readonly context: BrowserContext;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
	}
}
