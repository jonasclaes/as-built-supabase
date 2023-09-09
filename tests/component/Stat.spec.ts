import Stat from '$lib/components/daisyui/Stat.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';
import type { Locator } from '@playwright/test';

const getLocators = (component: Locator) => {
	const figureLocator = component.locator('.stat-figure');
	const titleLocator = component.locator('.stat-title');
	const valueLocator = component.locator('.stat-value');
	const descriptionLocator = component.locator('.stat-desc');
	const actionsLocator = component.locator('.stat-actions');

	return {
		figureLocator,
		titleLocator,
		valueLocator,
		descriptionLocator,
		actionsLocator
	};
};

test.describe('Stat', () => {
	test('Default', async ({ mount }) => {
		const component = await mount(Stat);

		const { figureLocator, titleLocator, valueLocator, descriptionLocator, actionsLocator } =
			getLocators(component);

		await expect(component).toHaveClass('stat');
		await expect(figureLocator).toBeHidden();
		await expect(titleLocator).toBeHidden();
		await expect(valueLocator).toBeHidden();
		await expect(descriptionLocator).toBeHidden();
		await expect(actionsLocator).toBeHidden();
	});

	test('Figure', async ({ mount }) => {
		const component = await mount(Stat, {
			slots: {
				figure: 'Figure'
			}
		});

		const { figureLocator } = getLocators(component);
		await expect(figureLocator).toHaveText('Figure');
	});

	test('Title', async ({ mount }) => {
		const component = await mount(Stat, {
			props: {
				title: 'Title'
			}
		});

		const { titleLocator } = getLocators(component);
		await expect(titleLocator).toHaveText('Title');
	});

	test('Value', async ({ mount }) => {
		const component = await mount(Stat, {
			props: {
				value: 'Value'
			}
		});

		const { valueLocator } = getLocators(component);
		await expect(valueLocator).toHaveText('Value');
	});

	test('Description', async ({ mount }) => {
		const component = await mount(Stat, {
			props: {
				description: 'Description'
			}
		});

		const { descriptionLocator } = getLocators(component);
		await expect(descriptionLocator).toHaveText('Description');
	});

	test('Actions', async ({ mount }) => {
		const component = await mount(Stat, {
			slots: {
				actions: 'Actions'
			}
		});

		const { actionsLocator } = getLocators(component);
		await expect(actionsLocator).toHaveText('Actions');
	});
});
