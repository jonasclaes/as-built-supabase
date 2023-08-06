<script lang="ts" context="module">
	export type InputType =
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| (string & NonNullable<unknown>);
	export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { applyClassIf } from '$lib/ApplyClassIf';
	import { combineClasses } from '$lib/CombineClasses';

	export let formControlClasses = '';
	export let inputClasses = '';
	export let name: string;
	export let label: string | null = null;
	export let type: InputType = 'text';
	export let list: string | null = null;
	export let placeholder: string | null = null;
	export let disabled: boolean | null = null;
	export let required: boolean | null = null;
	export let bordered = false;
	export let ghost = false;
	export let primary = false;
	export let secondary = false;
	export let accent = false;
	export let info = false;
	export let success = false;
	export let warning = false;
	export let error = false;
	export let size: InputSize | null = null;
	export let value: unknown = null;
	export let helpText: string | null = null;
</script>

<div class={combineClasses('form-control', 'w-full', formControlClasses)}>
	{#if label}
		<label class="label" for={name}>
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		{type}
		{name}
		{placeholder}
		id={name}
		{list}
		class={combineClasses(
			'input',
			'w-full',
			inputClasses,
			applyClassIf(bordered, 'input-bordered'),
			applyClassIf(ghost, 'input-ghost'),
			applyClassIf(primary, 'input-primary'),
			applyClassIf(secondary, 'input-secondary'),
			applyClassIf(accent, 'input-accent'),
			applyClassIf(info, 'input-info'),
			applyClassIf(success, 'input-success'),
			applyClassIf(warning, 'input-warning'),
			applyClassIf(error, 'input-error'),
			applyClassIf(size === 'xs', 'input-xs'),
			applyClassIf(size === 'sm', 'input-sm'),
			applyClassIf(size === 'md', 'input-md'),
			applyClassIf(size === 'lg', 'input-lg')
		)}
		{value}
		{disabled}
		{required}
	/>
	{#if helpText}
		<label class="label" for={name}>
			<span class="label-text-alt">{helpText}</span>
		</label>
	{/if}
</div>
