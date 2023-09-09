<script lang="ts" context="module">
	export type AnchorSize = '' | 'xs' | 'sm' | 'md' | 'lg';
	export type AnchorStyle =
		| ''
		| 'ghost'
		| 'link'
		| 'outline'
		| 'glass'
		| 'wide'
		| 'block'
		| 'circle'
		| 'square';
	export type AnchorColor =
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
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAnchorAttributes {
		href: string;
		size?: AnchorSize;
		styles?: AnchorStyle[];
		color?: AnchorColor;
		class?: string;
		anchorRef?: HTMLAnchorElement;
	}

	const SIZE_MAPS: Record<AnchorSize, string> = {
		'': '',
		xs: 'btn-xs',
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};

	const STYLE_MAPS: Record<AnchorStyle, string> = {
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

	const COLOR_MAPS: Record<AnchorColor, string> = {
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

	export let href: string;
	export let size: AnchorSize = '';
	export let styles: AnchorStyle[] = [];
	export let color: AnchorColor = '';
	export let _class = '';
	export { _class as class };
	export let anchorRef: HTMLAnchorElement = $$props['anchorRef'] ?? null;
</script>

<a
	{href}
	class={combineClasses(
		'btn',
		SIZE_MAPS[size],
		...styles.map((style) => STYLE_MAPS[style]),
		COLOR_MAPS[color],
		_class
	)}
	bind:this={anchorRef}
	{...$$restProps}
>
	<slot />
</a>
