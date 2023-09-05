import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface Theme {
	name: string;
	value: string;
}

export const availableThemes: Theme[] = [
	{ name: 'Light', value: 'corporate' },
	{ name: 'Dark', value: 'business' },
	{ name: 'Synthwave', value: 'synthwave' },
	{ name: 'Emerald', value: 'emerald' },
	{ name: 'Night', value: 'night' }
];

const theme = browser ? localStorage.getItem('theme') : undefined;
export const themeStore = writable<Theme['value']>(theme ?? 'corporate');

themeStore.subscribe((value) => {
	if (browser) {
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem('theme', value);
	}
});
