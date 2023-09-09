<script lang="ts" context="module">
	export type SelectSize = '' | 'xs' | 'sm' | 'md' | 'lg';
	export type SelectStyle = '' | 'bordered' | 'ghost';
	export type SelectColor =
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
	import type { HTMLInputAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLInputAttributes {
		size?: SelectSize;
		style?: SelectStyle;
		color?: SelectColor;
		value?: unknown | undefined;
		class?: string;
	}

	const SIZE_MAPS: Record<SelectSize, string> = {
		'': '',
		xs: 'select-xs',
		sm: 'select-sm',
		md: 'select-md',
		lg: 'select-lg'
	};

	const STYLE_MAPS: Record<SelectStyle, string> = {
		'': '',
		bordered: 'select-bordered',
		ghost: 'select-ghost'
	};

	const COLOR_MAPS: Record<SelectColor, string> = {
		'': '',
		primary: 'select-primary',
		secondary: 'select-secondary',
		accent: 'select-accent',
		info: 'select-info',
		success: 'select-success',
		warning: 'select-warning',
		error: 'select-error'
	};

	export let size: SelectSize = '';
	export let style: SelectStyle = '';
	export let color: SelectColor = '';
	export let value: unknown | undefined = undefined;
	export let _class = '';
	export { _class as class };
</script>

<select
	class={combineClasses(
		'select',
		'w-full',
		SIZE_MAPS[size],
		STYLE_MAPS[style],
		COLOR_MAPS[color],
		_class
	)}
	on:change
	bind:value
	{...$$restProps}
>
	<slot />
</select>
