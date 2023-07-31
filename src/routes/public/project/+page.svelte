<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { project, organization } = data;
	$: ({ project, organization } = data);
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">{project.name} by {organization.name}</h1>
		<p class="text-base-content text-opacity-50">{project.code}</p>
	</div>
	<h2 class="text-xl">Revisions</h2>
	{#if project.revisions && project.revisions.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Code</th>
						<th>Created at</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each project.revisions as revision}
						<tr class="hover">
							<td class="font-bold">
								{revision.code}
							</td>
							<td>
								{new Date(revision.created_at ?? '').toLocaleString()}
							</td>
							<th>
								<div class="flex justify-end">
									<a href="/public/project/revision/{revision.id}" class="btn btn-ghost btn-xs"
										>Details</a
									>
								</div>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			This project does not have any revisions yet. Ask the owner of this project to create at least
			one.
		</p>
	{/if}
</section>
