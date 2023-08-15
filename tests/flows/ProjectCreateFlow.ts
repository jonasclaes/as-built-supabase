import type { ProjectCreatePage } from '../pages/ProjectCreatePage';

export class ProjectCreateFlow {
	public readonly projectCreatePage: ProjectCreatePage;

	constructor(projectCreatePage: ProjectCreatePage) {
		this.projectCreatePage = projectCreatePage;
	}

	public async createProject(code: string, name: string, clientName: string) {
		await this.projectCreatePage.navigateTo();
		await this.projectCreatePage.waitForInteractive();
		await this.projectCreatePage.enterProjectCode(code);
		await this.projectCreatePage.enterProjectName(name);
		await this.projectCreatePage.enterClientName(clientName);
		await this.projectCreatePage.clickCreate();
	}
}
