<script>
	import DrawerBase from './DrawerBase.svelte';
	import DrawerContent from './DrawerContent.svelte';
	import DrawerSide from './DrawerSide.svelte';

	export let id = '';
	export let open = false;
</script>

<DrawerBase {id} bind:open>
	<DrawerContent class="flex flex-col min-h-screen">
		<slot />
	</DrawerContent>
	<DrawerSide {id} slot="side">
		<slot name="side" />
	</DrawerSide>
</DrawerBase>
