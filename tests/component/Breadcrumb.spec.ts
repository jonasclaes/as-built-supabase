import Breadcrumb from '$lib/components/daisyui/Breadcrumb.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Breadcrumb', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Breadcrumb, {
			slots: {
				default: 'Hello, world!'
			}
		});

		await expect(component).toContainText('Hello, world!');
	});

	test('Link', async ({ mount }) => {
		const component = await mount(Breadcrumb, {
			props: {
				href: '#'
			},
			slots: {
				default: 'Hello, world!'
			}
		});
		const link = component.getByRole('link');

		await expect(link).toContainText('Hello, world!');
		await expect(link).toHaveAttribute('href', '#');
	});
});
