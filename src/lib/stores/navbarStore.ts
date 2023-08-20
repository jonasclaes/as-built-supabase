import { writable } from 'svelte/store';

export interface NavbarItem {
	name: string;
	path: string;
}

export interface NavbarStore {
	items: NavbarItem[];
	open: boolean;
}

export const navbarStore = writable<NavbarStore>({
	items: [],
	open: false
});
