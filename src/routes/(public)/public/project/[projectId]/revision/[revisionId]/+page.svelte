<script lang="ts">
	import { formatBytes } from '$lib/Formatters';
	import Link from '$lib/components/daisyui/Link.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { organization, project, revision, files } = data;
	$: ({ organization, project, revision, files } = data);
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">Revision {revision.code}</h1>
		<p class="text-base-content text-opacity-50">{project.name} by {organization.name}</p>
	</div>
	<h2 class="text-2xl">Files</h2>
	{#if files && files.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Name</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each files as file}
						<tr class="hover">
							<td>
								<div class="flex items-center">
									<div>
										<div class="font-bold break-all">{file.name}</div>
										<div class="text-sm opacity-50">
											{new Date(file.created_at).toLocaleString()}
										</div>
										<div class="text-sm opacity-50">
											{formatBytes(file.metadata.size)}
										</div>
									</div>
								</div>
							</td>
							<td>
								<div class="flex justify-end">
									<Link
										href="/public/project/{project.id}/revision/{revision.id}/file/{file.name}"
										target="_blank"
										color="primary"
										size="xs">Download</Link
									>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			This revision does not have any files attached to it.
		</p>
	{/if}
</section>
