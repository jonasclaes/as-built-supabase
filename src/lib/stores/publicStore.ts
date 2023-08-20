import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface PublicDto {
	externalUser?: {
		fullName: string;
		email: string;
	};
}

export const publicStore = writable<PublicDto>({});

if (browser) {
	publicStore.set(JSON.parse(localStorage.getItem('publicStore') || '{}'));

	publicStore.subscribe((publicDto) => {
		localStorage.setItem('publicStore', JSON.stringify(publicDto));
	});
}
