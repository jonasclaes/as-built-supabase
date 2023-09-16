import Drawer from '$lib/components/daisyui/Drawer.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Drawer', () => {
	test('Default', async ({ mount }) => {
		const drawer = await mount(Drawer, {
			props: {
				id: 'test'
			},
			slots: {
				default: 'Drawer content',
				side: 'Drawer side'
			}
		});

		const drawerContent = drawer.locator('div.drawer-content');
		const drawerSide = drawer.locator('div.drawer-side');

		await expect(drawer).toHaveClass('drawer');
		await expect(drawerContent).toHaveText('Drawer content');
		await expect(drawerSide).toHaveText('Drawer side');
	});
});
