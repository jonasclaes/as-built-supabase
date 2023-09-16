import DrawerSide from '$lib/components/daisyui/DrawerSide.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('DrawerSide', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(DrawerSide, {
			slots: {
				default: 'Default slot'
			},
			props: {
				id: 'test'
			}
		});

		const label = component.locator('label');

		await expect(component).toHaveClass('drawer-side z-50');
		await expect(component).toHaveText('Default slot');
		await expect(label).toHaveClass('drawer-overlay');
		await expect(label).toHaveAttribute('for', 'drawer-test');
	});
});
