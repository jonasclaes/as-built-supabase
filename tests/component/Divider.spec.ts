import Divider from '$lib/components/daisyui/Divider.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Divider', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Divider);

		await expect(component).toHaveClass('divider');
	});

	test('Horizontal', async ({ mount }) => {
		const component = await mount(Divider, {
			props: {
				orientation: 'horizontal'
			}
		});

		await expect(component).toHaveClass('divider divider-horizontal');
	});

	test('Vertical', async ({ mount }) => {
		const component = await mount(Divider, {
			props: {
				orientation: 'vertical'
			}
		});

		await expect(component).toHaveClass('divider divider-vertical');
	});
});
