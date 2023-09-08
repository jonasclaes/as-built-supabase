import Toast from '$lib/components/daisyui/Toast.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Toast', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Toast);

		await expect(component).toHaveClass('toast z-50');
	});

	test('Text', async ({ mount }) => {
		const component = await mount(Toast, {
			slots: {
				default: 'Hello, world!'
			}
		});

		await expect(component).toContainText('Hello, world!');
	});

	test.describe('Horizontal', () => {
		test('Left', async ({ mount }) => {
			const component = await mount(Toast, {
				props: {
					horizontalLocation: 'left'
				}
			});

			await expect(component).toHaveClass('toast z-50 toast-start');
		});

		test('Middle', async ({ mount }) => {
			const component = await mount(Toast, {
				props: {
					horizontalLocation: 'middle'
				}
			});

			await expect(component).toHaveClass('toast z-50 toast-center');
		});

		test('Right', async ({ mount }) => {
			const component = await mount(Toast, {
				props: {
					horizontalLocation: 'right'
				}
			});

			await expect(component).toHaveClass('toast z-50 toast-end');
		});
	});

	test.describe('Vertical', () => {
		test('Top', async ({ mount }) => {
			const component = await mount(Toast, {
				props: {
					verticalLocation: 'top'
				}
			});

			await expect(component).toHaveClass('toast z-50 toast-top');
		});

		test('Middle', async ({ mount }) => {
			const component = await mount(Toast, {
				props: {
					verticalLocation: 'middle'
				}
			});

			await expect(component).toHaveClass('toast z-50 toast-middle');
		});

		test('Bottom', async ({ mount }) => {
			const component = await mount(Toast, {
				props: {
					verticalLocation: 'bottom'
				}
			});

			await expect(component).toHaveClass('toast z-50 toast-bottom');
		});
	});
});
