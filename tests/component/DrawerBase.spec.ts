import DrawerBase from '$lib/components/daisyui/DrawerBase.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Divider', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(DrawerBase, {
			props: {
				id: 'test'
			}
		});

		const input = component.locator('input');

		await expect(component).toHaveClass('drawer');
		await expect(input).toHaveId('drawer-test');
		await expect(input).toHaveAttribute('type', 'checkbox');
		await expect(input).toHaveClass('drawer-toggle');
	});

	test('Left', async ({ mount }) => {
		const component = await mount(DrawerBase, {
			props: {
				position: 'left'
			}
		});

		await expect(component).toHaveClass('drawer');
	});

	test('Right', async ({ mount }) => {
		const component = await mount(DrawerBase, {
			props: {
				position: 'right'
			}
		});

		await expect(component).toHaveClass('drawer drawer-end');
	});
});
