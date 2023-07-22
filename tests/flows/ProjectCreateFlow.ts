import type { BrowserContext } from '@playwright/test';
import type { ProjectCreatePage } from '../pages/ProjectCreatePage';

export class ProjectCreateFlow {
	public readonly projectCreatePage: ProjectCreatePage;
	public readonly context: BrowserContext;

	constructor(projectCreatePage: ProjectCreatePage, context: BrowserContext) {
		this.projectCreatePage = projectCreatePage;
		this.context = context;
	}

	public async createProject(code: string, name: string, clientName: string) {
		await this.projectCreatePage.navigateTo();
		await this.projectCreatePage.enterProjectCode(code);
		await this.projectCreatePage.enterProjectName(name);
		await this.projectCreatePage.enterClientName(clientName);
		await this.projectCreatePage.clickCreate();
	}
}
