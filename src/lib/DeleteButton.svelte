<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import type { ActionReturn } from 'svelte/action';
  import { clickOutside } from '../utils/clickOutside';
	import type { Session } from '../types/session';

	export let session: Session;

	const dispatch = createEventDispatcher();
	let confirmation: boolean = false;

	const confirm = (): void => {
		confirmation = true;
	};

  const handleClick = () => {
    confirmation = false;
	}

	const deleteSession = (session: Session) => async () => {
		if (!confirmation) return;
		const res = await fetch('http://localhost:8000/sessions', {
			method: 'DELETE',
			body: JSON.stringify(session._id)
		});
		if (res.ok) {
			dispatch('delete', {
				id: session._id
			});
		}
	};
</script>

<div class="ml-auto">
	{#if !confirmation}
		<button
			on:click={() => {
				confirm();
			}}
			class="bg-red-500 p-[10px] text-white font-semibold rounded-sm hover:bg-red-600 transition"
			>Delete Session</button
		>
	{:else}
		<button
			on:click={deleteSession(session)}
      use:clickOutside on:click_outside={handleClick}
			class="bg-red-500 p-[10px] text-white font-semibold rounded-sm hover:bg-red-600 transition"
			>Are you sure?</button
		>
	{/if}
</div>
