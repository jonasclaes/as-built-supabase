<script lang="ts">
	import { applyClassIf } from '$lib/ApplyClassIf';
	import { combineClasses } from '$lib/CombineClasses';
	import { onMount } from 'svelte';
	import Button from './daisyui/Button.svelte';
	import FormControl from './daisyui/FormControl.svelte';
	import FormInput from './daisyui/FormInput.svelte';
	import FormInputHelpText from './daisyui/FormInputHelpText.svelte';
	import FormInputLabel from './daisyui/FormInputLabel.svelte';
	import FormTextAreaInput from './daisyui/FormTextAreaInput.svelte';

	type CreateRevisionProposalStep = 1 | 2 | 3 | 4;

	let modal: HTMLDialogElement;
	let step: CreateRevisionProposalStep = 1;

	let fullName = '';
	let email = '';
	let title = '';
	let description = '';

	export const open = () => {
		modal.showModal();
	};

	onMount(() => {
		modal.showModal();
	});
</script>

<dialog class="modal" bind:this={modal}>
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<h3 class="font-bold text-lg pb-2">Create revision proposal</h3>
		<div class="overflow-x-auto">
			<ul class="steps pb-2">
				<li class={combineClasses('step', applyClassIf(step >= 1, 'step-primary'))}>Start</li>
				<li class={combineClasses('step', applyClassIf(step >= 2, 'step-primary'))}>
					Personal Details
				</li>
				<li class={combineClasses('step', applyClassIf(step >= 3, 'step-primary'))}>
					Document Changes
				</li>
				<li class={combineClasses('step', applyClassIf(step >= 4, 'step-primary'))}>Finish</li>
			</ul>
		</div>
		{#if step === 1}
			<div class="grid md:grid-cols-1 gap-3">
				<p>
					In order to create a new revision proposal, you will need to fill out some form fields.
				</p>
				<div class="grid md:grid-cols-3 gap-3">
					<Button primary type="button" buttonClasses="col-start-3" on:click={() => step++}
						>Start</Button
					>
				</div>
			</div>
		{/if}
		{#if step === 2}
			<div class="grid md:grid-cols-1 gap-3">
				<p>Let's start out with your personal details.</p>
				<FormControl>
					<FormInputLabel for="fullName">Full name</FormInputLabel>
					<FormInput
						name="fullName"
						id="fullName"
						placeholder="John Doe"
						required
						style="bordered"
						bind:value={fullName}
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
						bind:value={email}
					/>
					<FormInputHelpText for="email">
						Please enter your email address here, so we can contact you if we have any questions and
						update you on the status of your proposal.
					</FormInputHelpText>
				</FormControl>
				<div class="grid md:grid-cols-3 gap-3">
					<Button secondary type="button" on:click={() => step--}>Back</Button>
					<Button primary type="button" buttonClasses="col-start-3" on:click={() => step++}
						>Next</Button
					>
				</div>
			</div>
		{/if}
		{#if step === 3}
			<div class="grid md:grid-cols-1 gap-3">
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
						bind:value={title}
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
						class="h-40"
						bind:value={description}
					/>
					<FormInputHelpText for="description">
						Please enter a description for your proposal here, so we can easily identify what it is
						about.
					</FormInputHelpText>
				</FormControl>
				<div class="grid md:grid-cols-3 gap-3">
					<Button secondary type="button" on:click={() => step--}>Back</Button>
					<Button primary type="button" buttonClasses="col-start-3" on:click={() => step++}
						>Next</Button
					>
				</div>
			</div>
		{/if}
		{#if step === 4}
			<div class="grid md:grid-cols-1 gap-3">
				<p>
					<span class="font-bold">You're all set!</span> Please review your proposal and click the "Submit"
					button to submit it to the revision committee.
				</p>
				<div class="grid md:grid-cols-3 gap-3">
					<Button secondary type="button" on:click={() => step--}>Back</Button>
					<Button primary buttonClasses="col-start-3">Finish</Button>
				</div>
			</div>
		{/if}
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
