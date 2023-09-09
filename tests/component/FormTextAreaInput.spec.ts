import FormTextAreaInput from '$lib/components/daisyui/FormTextAreaInput.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('FormTextAreaInput', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(FormTextAreaInput);

		await expect(component).toHaveClass('textarea w-full');
		await expect(component).toHaveValue('');
	});

	test('Value', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				value: 'Hello World'
			}
		});

		await expect(component).toHaveClass('textarea w-full');
		await expect(component).toHaveValue('Hello World');
	});

	test('Enter value', async ({ mount }) => {
		let value = '';

		const component = await mount(FormTextAreaInput, {
			on: {
				input: async () => {
					value = await component.inputValue();
				}
			}
		});

		await component.fill('Hello World');
		await expect(component).toHaveValue('Hello World');
		expect(value).toBe('Hello World');
	});

	test('Bordered', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				style: 'bordered'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-bordered');
	});

	test('Ghost', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				style: 'ghost'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-ghost');
	});

	test('Primary', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'primary'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-primary');
	});

	test('Secondary', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'secondary'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-secondary');
	});

	test('Accent', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'accent'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-accent');
	});

	test('Info', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'info'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-info');
	});

	test('Success', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'success'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-success');
	});

	test('Warning', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'warning'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-warning');
	});

	test('Error', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				color: 'error'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-error');
	});

	test('Size xs', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				size: 'xs'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-xs');
	});

	test('Size sm', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				size: 'sm'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-sm');
	});

	test('Size md', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				size: 'md'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-md');
	});

	test('Size lg', async ({ mount }) => {
		const component = await mount(FormTextAreaInput, {
			props: {
				size: 'lg'
			}
		});

		await expect(component).toHaveClass('textarea w-full textarea-lg');
	});
});
