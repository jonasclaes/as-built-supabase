import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface PublicDto {
	externalUser?: {
		fullName: string;
		email: string;
	};
}

const storedPublicStore = browser ? JSON.parse(localStorage.getItem('publicStore') || '{}') : {};
export const publicStore = writable<PublicDto>(storedPublicStore);

publicStore.subscribe((publicDto) => {
	if (browser) localStorage.setItem('publicStore', JSON.stringify(publicDto));
});
