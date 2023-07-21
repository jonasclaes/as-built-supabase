/** @type {import('./tests/BaseTest').AutomationConfig} */
export const automationConfig = {
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
