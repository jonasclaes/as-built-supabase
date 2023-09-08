import FormInputHelpText from '$lib/components/daisyui/FormInputHelpText.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('FormInputHelpText', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(FormInputHelpText, {
			slots: {
				default: 'Hello, world!'
			},
			props: {
				for: 'test'
			}
		});

		await expect(component).toHaveClass('label');
		await expect(component).toHaveAttribute('for', 'test');
		await expect(component.locator('span')).toHaveClass('label-text-alt');
		await expect(component).toContainText('Hello, world!');
	});
});
