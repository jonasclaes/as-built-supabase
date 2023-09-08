import FormControl from '$lib/components/daisyui/FormControl.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('FormControl', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(FormControl, {
			slots: {
				default: 'Hello, world!'
			}
		});

		await expect(component).toHaveClass('form-control w-full');
		await expect(component).toContainText('Hello, world!');
	});
});
