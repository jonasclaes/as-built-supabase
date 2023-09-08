import FormInput from '$lib/components/daisyui/FormInput.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('FormInput', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(FormInput);

		await expect(component).toHaveClass('input w-full');
		await expect(component).toHaveAttribute('type', 'text');
	});

	test('Value', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				value: 'Hello World'
			}
		});

		await expect(component).toHaveClass('input w-full');
		await expect(component).toHaveAttribute('type', 'text');
		await expect(component).toHaveValue('Hello World');
	});

	test('Enter value', async ({ mount }) => {
		let value = '';

		const component = await mount(FormInput, {
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

	test('Text Input', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				type: 'text'
			}
		});

		await expect(component).toHaveClass('input w-full');
		await expect(component).toHaveAttribute('type', 'text');
	});

	test('Email Input', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				type: 'email'
			}
		});

		await expect(component).toHaveClass('input w-full');
		await expect(component).toHaveAttribute('type', 'email');
	});

	test('Password Input', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				type: 'password'
			}
		});

		await expect(component).toHaveClass('input w-full');
		await expect(component).toHaveAttribute('type', 'password');
	});

	test('Bordered', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				style: 'bordered'
			}
		});

		await expect(component).toHaveClass('input w-full input-bordered');
	});

	test('Ghost', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				style: 'ghost'
			}
		});

		await expect(component).toHaveClass('input w-full input-ghost');
	});

	test('Primary', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'primary'
			}
		});

		await expect(component).toHaveClass('input w-full input-primary');
	});

	test('Secondary', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'secondary'
			}
		});

		await expect(component).toHaveClass('input w-full input-secondary');
	});

	test('Accent', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'accent'
			}
		});

		await expect(component).toHaveClass('input w-full input-accent');
	});

	test('Info', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'info'
			}
		});

		await expect(component).toHaveClass('input w-full input-info');
	});

	test('Success', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'success'
			}
		});

		await expect(component).toHaveClass('input w-full input-success');
	});

	test('Warning', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'warning'
			}
		});

		await expect(component).toHaveClass('input w-full input-warning');
	});

	test('Error', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				color: 'error'
			}
		});

		await expect(component).toHaveClass('input w-full input-error');
	});

	test('Size xs', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				size: 'xs'
			}
		});

		await expect(component).toHaveClass('input w-full input-xs');
	});

	test('Size sm', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				size: 'sm'
			}
		});

		await expect(component).toHaveClass('input w-full input-sm');
	});

	test('Size md', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				size: 'md'
			}
		});

		await expect(component).toHaveClass('input w-full input-md');
	});

	test('Size lg', async ({ mount }) => {
		const component = await mount(FormInput, {
			props: {
				size: 'lg'
			}
		});

		await expect(component).toHaveClass('input w-full input-lg');
	});
});
