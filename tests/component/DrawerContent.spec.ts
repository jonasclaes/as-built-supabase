import DrawerContent from '$lib/components/daisyui/DrawerContent.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('DrawerContent', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(DrawerContent, {
			slots: {
				default: 'Default slot'
			}
		});

		await expect(component).toHaveClass('drawer-content');
		await expect(component).toHaveText('Default slot');
	});
});
