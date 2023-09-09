import FormSelect from '$lib/components/daisyui/FormSelect.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('FormSelect', () => {
	const defaultOptions = `<option value="Hello World" selected>Hello World</option><option value="Hello World 2">Hello World 2</option><option value="Hello World 3">Hello World 3</option>`;

	test('Default', async ({ mount }) => {
		const component = await mount(FormSelect);

		await expect(component).toHaveClass('select w-full');
	});

	test('Value', async ({ mount }) => {
		const component = await mount(FormSelect, {
			slots: {
				default: defaultOptions
			}
		});

		await expect(component).toHaveClass('select w-full');
		await expect(component).toHaveValue('Hello World');
	});

	test('Select value', async ({ mount }) => {
		let value = '';

		const component = await mount(FormSelect, {
			on: {
				change: async () => {
					value = await component.inputValue();
				}
			},
			slots: {
				default: defaultOptions
			}
		});

		await component.selectOption({ label: 'Hello World 2' });
		await expect(component).toHaveValue('Hello World 2');
		expect(value).toBe('Hello World 2');
	});

	test('Bordered', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				style: 'bordered'
			}
		});

		await expect(component).toHaveClass('select w-full select-bordered');
	});

	test('Ghost', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				style: 'ghost'
			}
		});

		await expect(component).toHaveClass('select w-full select-ghost');
	});

	test('Primary', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'primary'
			}
		});

		await expect(component).toHaveClass('select w-full select-primary');
	});

	test('Secondary', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'secondary'
			}
		});

		await expect(component).toHaveClass('select w-full select-secondary');
	});

	test('Accent', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'accent'
			}
		});

		await expect(component).toHaveClass('select w-full select-accent');
	});

	test('Info', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'info'
			}
		});

		await expect(component).toHaveClass('select w-full select-info');
	});

	test('Success', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'success'
			}
		});

		await expect(component).toHaveClass('select w-full select-success');
	});

	test('Warning', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'warning'
			}
		});

		await expect(component).toHaveClass('select w-full select-warning');
	});

	test('Error', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				color: 'error'
			}
		});

		await expect(component).toHaveClass('select w-full select-error');
	});

	test('Size xs', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				size: 'xs'
			}
		});

		await expect(component).toHaveClass('select w-full select-xs');
	});

	test('Size sm', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				size: 'sm'
			}
		});

		await expect(component).toHaveClass('select w-full select-sm');
	});

	test('Size md', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				size: 'md'
			}
		});

		await expect(component).toHaveClass('select w-full select-md');
	});

	test('Size lg', async ({ mount }) => {
		const component = await mount(FormSelect, {
			props: {
				size: 'lg'
			}
		});

		await expect(component).toHaveClass('select w-full select-lg');
	});
});
