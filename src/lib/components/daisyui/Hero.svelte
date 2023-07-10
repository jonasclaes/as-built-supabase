<script lang="ts">
	export let title: string;
	export let body = '';
	export let buttonText: string | null = null;
	export let buttonHref = '#';
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{title}</h1>
			<p class="py-6">
				{body}
			</p>
			{#if buttonText}
				<a class="btn btn-primary" href={buttonHref}>{buttonText}</a>
			{/if}
		</div>
	</div>
</div>
