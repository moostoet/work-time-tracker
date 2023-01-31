<script lang="ts">
	import type { PageServerData } from './$types';
	import Sessions from '../lib/Sessions.svelte';
	import NewSession from '../lib/NewSession.svelte';
	import ActiveSession from '../lib/ActiveSession.svelte';
	export let data: PageServerData;
	let newSession: boolean = false;

	$: completedSessions = data.sessions.filter((session) => 'hours' in session);
	$: activeSession = data.sessions.find((session) => !('hours' in session));
</script>

<main class="p-4">
	<div class="px-8">
		<button
			on:click={() => {
				newSession = true;
			}}
			class="p-[10px] rounded-sm bg-blue-400 text-white font-semibold hover:bg-blue-500"
			>New Session</button
		>
	</div>
	{#if newSession}
		<NewSession
			on:cancel={() => {
				newSession = false;
			}}
		/>
	{/if}
	{#if activeSession}
		<ActiveSession session={activeSession} />
	{/if}
	<Sessions sessions={completedSessions} />
</main>
