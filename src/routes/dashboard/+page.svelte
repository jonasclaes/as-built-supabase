<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { projects, clients } = data;
	$: ({ projects, clients } = data);

	const getClientNameByClientId = (clientId: string | null): string => {
		if (!clients || clients.length === 0) return '';
		if (!clientId) return 'No client assigned';
		return clients.find((client) => client.id === clientId)?.name ?? 'Client not found';
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div class="stats stats-vertical lg:stats-horizontal shadow bg-base-200">
		<div class="stat place-items-center">
			<div class="stat-title">Projects</div>
			<div class="stat-value">{projects?.length ?? NaN}</div>
			<div class="stat-desc">Total amount of projects</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Clients</div>
			<div class="stat-value">{clients?.length ?? NaN}</div>
			<div class="stat-desc">Total amount of clients</div>
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
						<th>Project</th>
						<th>Client</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each projects as project}
						<tr class="hover">
							<td>
								<div class="flex items-center">
									<div>
										<div class="font-bold">{project.name}</div>
										<div class="text-sm opacity-50">
											{project.code}
										</div>
									</div>
								</div>
							</td>
							<td>
								{getClientNameByClientId(project.client)}
							</td>
							<th>
								<div class="flex justify-end">
									<a href="/project/{project.id}" class="btn btn-ghost btn-xs">Details</a>
								</div>
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
	<div class="divider" />
	<div class="flex flex-col md:flex-row gap-3 justify-between">
		<h2 class="text-3xl">Clients</h2>
		<a href="/client" class="btn btn-primary">New client</a>
	</div>
	{#if clients && clients.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Client</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each clients as client}
						<tr class="hover">
							<td>
								<div class="flex items-center">
									<div>
										<div class="font-bold">{client.name}</div>
										<div class="text-sm opacity-50">{client.code}</div>
									</div>
								</div>
							</td>
							<th>
								<div class="flex justify-end">
									<a href="/client/{client.id}" class="btn btn-ghost btn-xs">Details</a>
								</div>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			You don't have any clients yet. Why don't you <a
				href="/client"
				class="text-primary underline hover:text-primary-focus">create</a
			> one now?
		</p>
	{/if}
</section>
