<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Session } from '../types/session';
	export let session: Session;

	const dispatch = createEventDispatcher();

	const deleteSession = (session: Session) => async () => {
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
	<button
		on:click={deleteSession(session)}
		class="bg-red-500 p-[10px] text-white font-semibold rounded-sm hover:bg-red-600 transition"
		>Delete Session</button
	>
</div>
