<script lang="ts" context="module">
	export type TextAreaSize = '' | 'xs' | 'sm' | 'md' | 'lg';
	export type TextAreaStyle = '' | 'bordered' | 'ghost';
	export type TextAreaColor =
		| ''
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLTextareaAttributes {
		size?: TextAreaSize;
		style?: TextAreaStyle;
		color?: TextAreaColor;
		class?: string;
		value?: string;
		textAreaRef?: HTMLTextAreaElement;
	}

	const SIZE_MAPS: Record<TextAreaSize, string> = {
		'': '',
		xs: 'textarea-xs',
		sm: 'textarea-sm',
		md: 'textarea-md',
		lg: 'textarea-lg'
	};

	const STYLE_MAPS: Record<TextAreaStyle, string> = {
		'': '',
		bordered: 'textarea-bordered',
		ghost: 'textarea-ghost'
	};

	const COLOR_MAPS: Record<TextAreaColor, string> = {
		'': '',
		primary: 'textarea-primary',
		secondary: 'textarea-secondary',
		accent: 'textarea-accent',
		info: 'textarea-info',
		success: 'textarea-success',
		warning: 'textarea-warning',
		error: 'textarea-error'
	};

	export let size: TextAreaSize = '';
	export let style: TextAreaStyle = '';
	export let color: TextAreaColor = '';
	export let _class = '';
	export { _class as class };
	export let value: string = $$props['value'] ?? '';
	export let textAreaRef: HTMLTextAreaElement = $$props['textAreaRef'] ?? null;
</script>

<textarea
	class={combineClasses(
		'input',
		'w-full',
		SIZE_MAPS[size],
		STYLE_MAPS[style],
		COLOR_MAPS[color],
		_class
	)}
	bind:this={textAreaRef}
	bind:value
	{...$$restProps}
/>
