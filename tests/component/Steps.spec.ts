import Steps from '$lib/components/daisyui/Steps.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Steps', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Steps);

		await expect(component).toHaveClass('steps');
	});

	test('Default slot', async ({ mount }) => {
		const component = await mount(Steps, {
			slots: {
				default: 'Steps content'
			}
		});

		await expect(component).toHaveText('Steps content');
	});

	test('Vertical', async ({ mount }) => {
		const component = await mount(Steps, {
			props: {
				layout: 'vertical'
			}
		});

		await expect(component).toHaveClass('steps steps-vertical');
	});

	test('Horizontal', async ({ mount }) => {
		const component = await mount(Steps, {
			props: {
				layout: 'horizontal'
			}
		});

		await expect(component).toHaveClass('steps steps-horizontal');
	});
});
