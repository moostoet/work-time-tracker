<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const cancel = () => {
		dispatch('cancel');
	};
</script>

<div class="p-8 flex flex-col gap-3">
	<div class="p-8 bg-white rounded-md flex flex-col gap-3 shadow-sm">
		<form class="flex flex-col gap-3" action="?/sessions" method="POST" use:enhance>
			<label class="text-md font-semibold" for="sessionName">Session name</label>
			<input
				name="sessionName"
				type="text"
				class="border p-2 rounded-sm bg-gray-100 focus:outline-1 outline-blue-300"
			/>
			<label class="text-md font-semibold" for="hourlyRate">Hourly rate</label>
			<input
				name="hourlyRate"
				type="number"
				class="border p-2 rounded-sm bg-gray-100 focus:outline-1 outline-blue-300"
			/>
			<div class="flex flex-row">
				<button
					class="p-[10px] bg-blue-400 hover:bg-blue-500 transition text-white font-semibold rounded-sm"
					>Create session</button
				>
				<button
					type="button"
					on:click|preventDefault={() => {
						cancel();
					}}
					class="ml-auto p-[10px] bg-red-500 hover:bg-red-600 transition text-white font-semibold rounded-sm"
					>Cancel</button
				>
			</div>
		</form>
	</div>
</div>
