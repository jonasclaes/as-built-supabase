import Step from '$lib/components/daisyui/Step.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';

test.describe('Step', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Step);

		await expect(component).toHaveClass('step');
	});

	test('Default slot', async ({ mount }) => {
		const component = await mount(Step, {
			slots: {
				default: 'Step content'
			}
		});

		await expect(component).toHaveText('Step content');
	});

	test('Primary', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'primary'
			}
		});

		await expect(component).toHaveClass('step step-primary');
	});

	test('Secondary', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'secondary'
			}
		});

		await expect(component).toHaveClass('step step-secondary');
	});

	test('Accent', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'accent'
			}
		});

		await expect(component).toHaveClass('step step-accent');
	});

	test('Success', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'success'
			}
		});

		await expect(component).toHaveClass('step step-success');
	});

	test('Warning', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'warning'
			}
		});

		await expect(component).toHaveClass('step step-warning');
	});

	test('Error', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'error'
			}
		});

		await expect(component).toHaveClass('step step-error');
	});

	test('Info', async ({ mount }) => {
		const component = await mount(Step, {
			props: {
				color: 'info'
			}
		});

		await expect(component).toHaveClass('step step-info');
	});
});
