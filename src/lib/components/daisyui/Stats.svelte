<script lang="ts" context="module">
	export type StatsOrientation = '' | 'horizontal' | 'vertical';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';

	const ORIENTATION_MAPS: Record<StatsOrientation, string> = {
		'': '',
		horizontal: 'stats-horizontal',
		vertical: 'stats-vertical'
	};

	export let orientation: StatsOrientation = '';
	export let _class = '';
	export { _class as class };
</script>

<div class={combineClasses('stats', ORIENTATION_MAPS[orientation], _class)} {...$$restProps}>
	<slot />
</div>
