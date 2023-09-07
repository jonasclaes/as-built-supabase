import Stats from '$lib/components/daisyui/Stats.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Stats', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Stats);

		await expect(component).toHaveClass('stats');
	});

	test('Horizontal', async ({ mount }) => {
		const component = await mount(Stats, {
			props: {
				orientation: 'horizontal'
			}
		});

		await expect(component).toHaveClass('stats stats-horizontal');
	});

	test('Vertical', async ({ mount }) => {
		const component = await mount(Stats, {
			props: {
				orientation: 'vertical'
			}
		});

		await expect(component).toHaveClass('stats stats-vertical');
	});
});
