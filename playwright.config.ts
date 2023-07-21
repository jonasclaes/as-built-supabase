import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'yarn build && yarn preview',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	reporter: [
		['html', { open: 'never' }],
		['junit', { outputFile: 'junit-results.xml' }]
	],
	use: {
		trace: 'on-first-retry'
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
