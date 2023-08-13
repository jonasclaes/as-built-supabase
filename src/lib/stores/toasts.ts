import type { AlertType } from '$lib/components/daisyui/Alert.svelte';
import { writable } from 'svelte/store';

let id = 0;

export interface ToastDto {
	id: number;
	message: string;
	type: AlertType;
}

export const toasts = writable<ToastDto[]>([]);

export const addToast = (toast: Omit<ToastDto, 'id'>) => {
	const toastDto = {
		id: id++,
		...toast
	};

	toasts.update((toasts) => [...toasts, toastDto]);
	setTimeout(() => removeToast(toastDto), 5000);
};

export const removeToast = (toast: ToastDto) => {
	toasts.update((toasts) => toasts.filter((t) => t !== toast));
};

export const clearToasts = () => {
	toasts.set([]);
};
