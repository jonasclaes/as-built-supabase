import type { ClientCreatePage } from '../pages/ClientCreatePage';

export class ClientCreateFlow {
	public readonly clientCreatePage: ClientCreatePage;

	constructor(clientCreatePage: ClientCreatePage) {
		this.clientCreatePage = clientCreatePage;
	}

	public async createClient(code: string, name: string) {
		await this.clientCreatePage.navigateTo();
		await this.clientCreatePage.waitForInteractive();
		await this.clientCreatePage.enterClientCode(code);
		await this.clientCreatePage.enterClientName(name);
		await this.clientCreatePage.clickCreate();
	}
}
