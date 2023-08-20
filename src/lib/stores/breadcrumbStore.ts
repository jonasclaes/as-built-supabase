import { writable } from 'svelte/store';

export interface Breadcrumb {
	name: string;
	path?: string;
}

export const breadcrumbStore = writable<Breadcrumb[]>([]);
