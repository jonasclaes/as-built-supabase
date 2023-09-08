import Breadcrumbs from '$lib/components/daisyui/Breadcrumbs.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Breadcrumbs', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Breadcrumbs);

		await expect(component).toHaveClass('breadcrumbs');
	});

	test('Text', async ({ mount }) => {
		const component = await mount(Breadcrumbs, {
			slots: {
				default: 'Hello, world!'
			}
		});

		await expect(component).toContainText('Hello, world!');
	});
});
