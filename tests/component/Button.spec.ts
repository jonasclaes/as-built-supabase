import Button from '$lib/components/daisyui/Button.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Button', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Button);

		await expect(component).toHaveClass('btn');
	});

	test('Text', async ({ mount }) => {
		const component = await mount(Button, {
			slots: {
				default: 'Hello, world!'
			}
		});

		await expect(component).toContainText('Hello, world!');
	});

	test('Primary', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'primary'
			}
		});

		await expect(component).toHaveClass('btn btn-primary');
	});

	test('Secondary', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'secondary'
			}
		});

		await expect(component).toHaveClass('btn btn-secondary');
	});

	test('Accent', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'accent'
			}
		});

		await expect(component).toHaveClass('btn btn-accent');
	});

	test('Info', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'info'
			}
		});

		await expect(component).toHaveClass('btn btn-info');
	});

	test('Success', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'success'
			}
		});

		await expect(component).toHaveClass('btn btn-success');
	});

	test('Warning', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'warning'
			}
		});

		await expect(component).toHaveClass('btn btn-warning');
	});

	test('Error', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				color: 'error'
			}
		});

		await expect(component).toHaveClass('btn btn-error');
	});

	test('Ghost', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['ghost']
			}
		});

		await expect(component).toHaveClass('btn btn-ghost');
	});

	test('Link', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['link']
			}
		});

		await expect(component).toHaveClass('btn btn-link');
	});

	test('Outline', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['outline']
			}
		});

		await expect(component).toHaveClass('btn btn-outline');
	});

	test('Glass', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['glass']
			}
		});

		await expect(component).toHaveClass('btn btn-glass');
	});

	test('Wide', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['wide']
			}
		});

		await expect(component).toHaveClass('btn btn-wide');
	});

	test('Block', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['block']
			}
		});

		await expect(component).toHaveClass('btn btn-block');
	});

	test('Circle', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['circle']
			}
		});

		await expect(component).toHaveClass('btn btn-circle');
	});

	test('Square', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				styles: ['square']
			}
		});

		await expect(component).toHaveClass('btn btn-square');
	});

	test('Size xs', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				size: 'xs'
			}
		});

		await expect(component).toHaveClass('btn btn-xs');
	});

	test('Size sm', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				size: 'sm'
			}
		});

		await expect(component).toHaveClass('btn btn-sm');
	});

	test('Size md', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				size: 'md'
			}
		});

		await expect(component).toHaveClass('btn btn-md');
	});

	test('Size lg', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				size: 'lg'
			}
		});

		await expect(component).toHaveClass('btn btn-lg');
	});

	test('Disabled', async ({ mount }) => {
		const component = await mount(Button, {
			props: {
				disabled: true
			}
		});

		await expect(component).toHaveClass('btn');
		await expect(component).toBeDisabled();
	});

	test('Click', async ({ mount }) => {
		let clicked = false;
		const component = await mount(Button, {
			on: {
				click: () => {
					clicked = true;
				}
			}
		});

		await component.click();
		expect(clicked).toBeTruthy();
	});
});
