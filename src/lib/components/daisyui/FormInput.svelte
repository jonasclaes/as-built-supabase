<script lang="ts" context="module">
	export type InputType = 'text' | 'email' | 'password';
	export type InputSize = '' | 'xs' | 'sm' | 'md' | 'lg';
	export type InputStyle = '' | 'bordered' | 'ghost';
	export type InputColor =
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
		type?: InputType;
		size?: InputSize;
		style?: InputStyle;
		color?: InputColor;
		class?: string;
		value?: string;
		inputRef?: HTMLInputElement;
	}

	const SIZE_MAPS: Record<InputSize, string> = {
		'': '',
		xs: 'input-xs',
		sm: 'input-sm',
		md: 'input-md',
		lg: 'input-lg'
	};

	const STYLE_MAPS: Record<InputStyle, string> = {
		'': '',
		bordered: 'input-bordered',
		ghost: 'input-ghost'
	};

	const COLOR_MAPS: Record<InputColor, string> = {
		'': '',
		primary: 'input-primary',
		secondary: 'input-secondary',
		accent: 'input-accent',
		info: 'input-info',
		success: 'input-success',
		warning: 'input-warning',
		error: 'input-error'
	};

	export let type: InputType = 'text';
	export let size: InputSize = '';
	export let style: InputStyle = '';
	export let color: InputColor = '';
	export let _class = '';
	export { _class as class };
	export let value: string = $$props['value'] ?? '';
	export let inputRef: HTMLInputElement = $$props['inputRef'] ?? null;
</script>

{#if type === 'text'}
	<input
		type="text"
		class={combineClasses(
			'input',
			'w-full',
			SIZE_MAPS[size],
			STYLE_MAPS[style],
			COLOR_MAPS[color],
			_class
		)}
		bind:value
		bind:this={inputRef}
		{...$$restProps}
	/>
{:else if type === 'email'}
	<input
		type="email"
		class={combineClasses(
			'input',
			'w-full',
			SIZE_MAPS[size],
			STYLE_MAPS[style],
			COLOR_MAPS[color],
			_class
		)}
		bind:value
		{...$$restProps}
	/>
{:else if type === 'password'}
	<input
		type="password"
		class={combineClasses(
			'input',
			'w-full',
			SIZE_MAPS[size],
			STYLE_MAPS[style],
			COLOR_MAPS[color],
			_class
		)}
		bind:value
		{...$$restProps}
	/>
{/if}
