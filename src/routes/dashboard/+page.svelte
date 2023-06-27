<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { projects } = data;
	$: ({ projects } = data);
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div class="flex flex-col items-center pt-2">
		<div class="indicator">
			<span class="indicator-item badge badge-primary">BETA</span>
			<h1 class="text-3xl p-1.5 text-center">AS-BUILT</h1>
		</div>
	</div>
	<div class="stats stats-vertical lg:stats-horizontal shadow bg-base-200">
		<div class="stat place-items-center">
			<div class="stat-title">Projects</div>
			<div class="stat-value">{data.projects?.length ?? NaN}</div>
			<div class="stat-desc">Total amount of projects</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Some statistic</div>
			<div class="stat-value">4,200</div>
			<div class="stat-desc">Gone up?</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Another statistic</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">Gone down!</div>
		</div>
	</div>
	<div class="divider" />
	<div class="flex flex-col md:flex-row gap-3 justify-between">
		<h2 class="text-3xl">Projects</h2>
		<a href="/project" class="btn btn-primary">New project</a>
	</div>
	{#if projects && projects.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Code</th>
						<th>Name</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each projects as project}
						<tr class="hover">
							<td>
								<div class="flex items-center">
									<div>
										<div class="font-bold">{project.code}</div>
										<div class="text-sm opacity-50">// TODO</div>
									</div>
								</div>
							</td>
							<td>
								{project.name}
							</td>
							<th>
								<a href="/project/{project.id}" class="btn btn-ghost btn-xs">Details</a>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			You don't have any projects yet. Why don't you <a
				href="/project"
				class="text-primary underline hover:text-primary-focus">create</a
			> one now?
		</p>
	{/if}
</section>
