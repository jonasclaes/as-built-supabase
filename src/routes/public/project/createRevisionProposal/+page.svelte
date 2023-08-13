<script lang="ts">
	import { enhance } from '$app/forms';
	import { applyClassIf } from '$lib/ApplyClassIf';
	import { combineClasses } from '$lib/CombineClasses';
	import Button from '$lib/components/daisyui/Button.svelte';
	import FormControl from '$lib/components/daisyui/FormControl.svelte';
	import FormInput from '$lib/components/daisyui/FormInput.svelte';
	import FormInputHelpText from '$lib/components/daisyui/FormInputHelpText.svelte';
	import FormInputLabel from '$lib/components/daisyui/FormInputLabel.svelte';
	import FormTextAreaInput from '$lib/components/daisyui/FormTextAreaInput.svelte';
	import Step from '$lib/components/daisyui/Step.svelte';
	import Steps from '$lib/components/daisyui/Steps.svelte';
	import { addToast } from '$lib/stores/toasts';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { project, organization } = data;
	$: ({ project, organization } = data);

	type CreateRevisionProposalStep = 1 | 2 | 3 | 4;

	let loading = false;
	let step: CreateRevisionProposalStep = 1;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update, result }) => {
			await update({ reset: false });
			loading = false;

			if (result.type === 'failure') {
				addToast({
					type: 'error',
					message: "Oops! We couldn't create your revision proposal. Please try again."
				});

				if (result.data?.missing === 'fullName' || result.data?.missing === 'email') {
					step = 2;
					return;
				}
				if (result.data?.missing === 'title' || result.data?.missing === 'description') {
					step = 3;
					return;
				}
				return;
			}

			addToast({
				type: 'success',
				message: 'Successfully created revision proposal.'
			});
		};
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">New revision proposal</h1>
		<p class="text-base-content text-opacity-50">{project.name} by {organization.name}</p>
	</div>
	<div class="overflow-x-auto">
		<Steps class="w-full">
			<Step color={step >= 1 ? 'primary' : ''}>Start</Step>
			<Step color={step >= 2 ? 'primary' : ''}>Personal Details</Step>
			<Step color={step >= 3 ? 'primary' : ''}>Document Changes</Step>
			<Step color={step >= 4 ? 'primary' : ''}>Submit</Step>
		</Steps>
	</div>
	<form method="post" action="?/createRevisionProposal" use:enhance={handleSubmit} novalidate>
		<div class={combineClasses('grid md:grid-cols-1 gap-3', applyClassIf(step !== 1, 'hidden'))}>
			<p>In order to create a new revision proposal, you will need to fill out some form fields.</p>
			<div class="grid md:grid-cols-3 gap-3">
				<Button color="primary" type="button" class="col-start-3" on:click={() => step++}
					>Start</Button
				>
			</div>
		</div>
		<div class={combineClasses('grid md:grid-cols-1 gap-3', applyClassIf(step !== 2, 'hidden'))}>
			<p>Let's start out with your personal details.</p>
			<FormControl>
				<FormInputLabel for="fullName">Full name</FormInputLabel>
				<FormInput
					name="fullName"
					id="fullName"
					placeholder="John Doe"
					required
					style="bordered"
					color={form?.missing === 'fullName' ? 'error' : undefined}
					value={form?.fullName ?? ''}
				/>
				<FormInputHelpText for="fullName">
					Please enter your full name here, so we can identify who made this proposal.
				</FormInputHelpText>
			</FormControl>
			<FormControl>
				<FormInputLabel for="email">Email</FormInputLabel>
				<FormInput
					type="email"
					name="email"
					id="email"
					placeholder="john.doe@example.com"
					required
					style="bordered"
					color={form?.missing === 'email' ? 'error' : undefined}
					value={form?.email ?? ''}
				/>
				<FormInputHelpText for="email">
					Please enter your email address here, so we can contact you if we have any questions and
					update you on the status of your proposal.
				</FormInputHelpText>
			</FormControl>
			<div class="grid md:grid-cols-3 gap-3">
				<Button color="secondary" type="button" on:click={() => step--}>Back</Button>
				<Button color="primary" type="button" class="col-start-3" on:click={() => step++}
					>Next</Button
				>
			</div>
		</div>
		<div class={combineClasses('grid md:grid-cols-1 gap-3', applyClassIf(step !== 3, 'hidden'))}>
			<p>Next, let's document the changes that you want to propose.</p>
			<FormControl>
				<FormInputLabel for="title">Title</FormInputLabel>
				<FormInput
					type="text"
					name="title"
					id="title"
					placeholder="Installed new hardware"
					required
					style="bordered"
					color={form?.missing === 'title' ? 'error' : undefined}
					value={form?.title ?? ''}
				/>
				<FormInputHelpText for="title">
					Please enter a title for your proposal here, so we can easily identify what it is about.
				</FormInputHelpText>
			</FormControl>
			<FormControl>
				<FormInputLabel for="description">Description</FormInputLabel>
				<FormTextAreaInput
					name="description"
					id="description"
					placeholder="Installed a new router, switch, and firewall."
					required
					style="bordered"
					color={form?.missing === 'description' ? 'error' : undefined}
					class="h-40"
					value={form?.description ?? ''}
				/>
				<FormInputHelpText for="description">
					Please enter a description for your proposal here, so we can easily identify what it is
					about.
				</FormInputHelpText>
			</FormControl>
			<div class="grid md:grid-cols-3 gap-3">
				<Button color="secondary" type="button" on:click={() => step--}>Back</Button>
				<Button color="primary" type="button" class="col-start-3" on:click={() => step++}
					>Next</Button
				>
			</div>
		</div>
		<div class={combineClasses('grid md:grid-cols-1 gap-3', applyClassIf(step !== 4, 'hidden'))}>
			<p>
				<span class="font-bold">You're all set!</span> Please review your proposal and click the "Submit"
				button to submit it to the revision committee.
			</p>
			<div class="grid md:grid-cols-3 gap-3">
				<Button color="secondary" type="button" on:click={() => step--} disabled={loading}
					>Back</Button
				>
				<Button color="primary" type="submit" class="col-start-3" disabled={loading}
					>{#if loading}
						<span class="loading loading-spinner" />
						loading
					{:else}
						Submit
					{/if}</Button
				>
			</div>
		</div>
	</form>
</section>
