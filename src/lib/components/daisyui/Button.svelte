<script lang="ts" context="module">
	export type ButtonSize = '' | 'xs' | 'sm' | 'md' | 'lg';
	export type ButtonStyle =
		| ''
		| 'ghost'
		| 'link'
		| 'outline'
		| 'glass'
		| 'wide'
		| 'block'
		| 'circle'
		| 'square';
	export type ButtonColor =
		| ''
		| 'neutral'
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
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLButtonAttributes {
		size?: ButtonSize;
		style?: ButtonStyle;
		color?: ButtonColor;
		class?: string;
		buttonRef?: HTMLButtonElement;
	}

	const SIZE_MAPS: Record<ButtonSize, string> = {
		'': '',
		xs: 'btn-xs',
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};

	const STYLE_MAPS: Record<ButtonStyle, string> = {
		'': '',
		ghost: 'btn-ghost',
		link: 'btn-link',
		outline: 'btn-outline',
		glass: 'btn-glass',
		wide: 'btn-wide',
		block: 'btn-block',
		circle: 'btn-circle',
		square: 'btn-square'
	};

	const COLOR_MAPS: Record<ButtonColor, string> = {
		'': '',
		neutral: 'btn-neutral',
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error'
	};

	export let size: ButtonSize = '';
	export let style: ButtonStyle = '';
	export let color: ButtonColor = '';
	export let _class = '';
	export { _class as class };
	export let buttonRef: HTMLButtonElement = $$props['buttonRef'] ?? null;
</script>

<button
	class={combineClasses('btn', SIZE_MAPS[size], STYLE_MAPS[style], COLOR_MAPS[color], _class)}
	bind:this={buttonRef}
	on:click
	{...$$restProps}
>
	<slot />
</button>
