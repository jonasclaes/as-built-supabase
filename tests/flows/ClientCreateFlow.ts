import type { BrowserContext } from '@playwright/test';
import type { ClientCreatePage } from '../pages/ClientCreatePage';

export class ClientCreateFlow {
	public readonly clientCreatePage: ClientCreatePage;
	public readonly context: BrowserContext;

	constructor(clientCreatePage: ClientCreatePage, context: BrowserContext) {
		this.clientCreatePage = clientCreatePage;
		this.context = context;
	}

	public async createClient(code: string, name: string) {
		await this.clientCreatePage.navigateTo();
		await this.clientCreatePage.enterClientCode(code);
		await this.clientCreatePage.enterClientName(name);
		await this.clientCreatePage.clickCreate();
	}
}
