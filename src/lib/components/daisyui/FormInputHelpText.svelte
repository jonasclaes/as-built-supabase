<script lang="ts">
	let _for: string;

	export { _for as for };
</script>

<label class="label" for={_for}>
	<span class="label-text-alt"><slot /></span>
</label>
