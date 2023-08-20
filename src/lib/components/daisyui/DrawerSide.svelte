<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLBaseAttributes {
		id: string;
		class?: string;
	}

	export let id = '';
	export let _class = '';
	export { _class as class };
</script>

<div class={combineClasses('drawer-side z-50', _class)} {...$$restProps}>
	<label for={`drawer-${id}`} class="drawer-overlay" />
	<slot />
</div>
