import FormInputLabel from '$lib/components/daisyui/FormInputLabel.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('FormInputHelpText', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(FormInputLabel, {
			slots: {
				default: 'Hello, world!'
			},
			props: {
				for: 'test'
			}
		});

		await expect(component).toHaveClass('label');
		await expect(component).toHaveAttribute('for', 'test');
		await expect(component.locator('span')).toHaveClass('label-text');
		await expect(component).toContainText('Hello, world!');
	});
});
