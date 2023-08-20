<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLBaseAttributes {
		class?: string;
	}

	export let _class = '';
	export { _class as class };
</script>

<div class={combineClasses('drawer-content', _class)} {...$$restProps}>
	<slot />
</div>
