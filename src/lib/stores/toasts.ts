import type { AlertType } from '$lib/components/daisyui/Alert.svelte';
import { writable } from 'svelte/store';

let id = 0;

export interface ToastDto {
	id: number;
	message: string;
	type: AlertType;
}

export const toastStore = writable<ToastDto[]>([]);

export const addToast = (toast: Omit<ToastDto, 'id'>) => {
	const toastDto = {
		id: id++,
		...toast
	};

	toastStore.update((toasts) => [...toasts, toastDto]);
	setTimeout(() => removeToast(toastDto), 5000);
};

export const removeToast = (toast: ToastDto) => {
	toastStore.update((toasts) => toasts.filter((t) => t !== toast));
};

export const clearToasts = () => {
	toastStore.set([]);
};
