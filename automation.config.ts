import type { AutomationConfig } from './tests/BaseTest';

export const automationConfig: AutomationConfig = {
	users: {
		validUser: {
			email: 'test-automation-1@jonasclaes.be',
			password: 'wmnyHYfihA23nJNLHTbAHvYZ'
		},
		invalidUser: {
			email: 'test-automation-1@jonasclaes.be',
			password: 'Wrong password'
		}
	}
};
