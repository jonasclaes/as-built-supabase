<script lang="ts" context="module">
	export type DividerOrientation = '' | 'horizontal' | 'vertical';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';

	const ORIENTATION_MAPS: Record<DividerOrientation, string> = {
		'': '',
		horizontal: 'divider-horizontal',
		vertical: 'divider-vertical'
	};

	export let orientation: DividerOrientation = '';
	export let _class = '';
	export { _class as class };
</script>

<div class={combineClasses('divider', ORIENTATION_MAPS[orientation], _class)} {...$$restProps}>
	<slot />
</div>
