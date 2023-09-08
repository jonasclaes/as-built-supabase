import Alert from '$lib/components/daisyui/Alert.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Alert', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Alert);

		await expect(component).toHaveClass('alert');
	});

	test('Text', async ({ mount }) => {
		const component = await mount(Alert, {
			slots: {
				default: 'Hello, world!'
			}
		});

		await expect(component).toContainText('Hello, world!');
	});

	test('Info', async ({ mount }) => {
		const component = await mount(Alert, {
			props: {
				type: 'info'
			}
		});

		await expect(component).toHaveClass('alert alert-info');
	});

	test('Success', async ({ mount }) => {
		const component = await mount(Alert, {
			props: {
				type: 'success'
			}
		});

		await expect(component).toHaveClass('alert alert-success');
	});

	test('Warning', async ({ mount }) => {
		const component = await mount(Alert, {
			props: {
				type: 'warning'
			}
		});

		await expect(component).toHaveClass('alert alert-warning');
	});

	test('Error', async ({ mount }) => {
		const component = await mount(Alert, {
			props: {
				type: 'error'
			}
		});

		await expect(component).toHaveClass('alert alert-error');
	});
});
