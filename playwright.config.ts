import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	reporter: [
		['html', { open: 'never' }],
		['junit', { outputFile: 'junit-results.xml' }]
	],
	workers: 1,
	use: {
		trace: 'on-first-retry',
		baseURL: process.env.BASE_URL || 'http://localhost:5173',
		serviceWorkers: 'block'
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox']
			}
		}
	]
};

export default config;
