import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const theme = browser ? localStorage.getItem('theme') : undefined;
export const themeStore = writable<string>(theme ?? 'corporate');

themeStore.subscribe((value) => {
	if (browser) {
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem('theme', value);
	}
});
