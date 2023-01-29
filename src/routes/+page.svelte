<script lang="ts">
	import type { PageServerData } from './$types';
	import { convertISODate, calculateHours } from '../use/time';
	import DeleteButton from '../components/DeleteButton.svelte';
	export let data: PageServerData;

	$: startTimesFormatted = data.sessions.map((session) => convertISODate(session.startTime));
	$: endTimesFormatted = data.sessions.map((session) => convertISODate(session.endTime));
	$: totalHours = data.sessions.map((session) =>
		calculateHours(session.startTime, session.endTime)
	);

  const handleDelete = (event: CustomEvent<{id: string}>) => {
    data.sessions = data.sessions.filter((session) => session._id !== event.detail.id);
  };
</script>

<main class="p-4">
	<div class="px-8">
		<button
			class="p-[10px] rounded-sm bg-blue-400 text-white font-semibold hover:bg-blue-500 transition"
			>New Session</button
		>
	</div>
	<div class="p-8 flex flex-col gap-3">
		{#if data.sessions.length === 0}
			<div class="text-xl font-semibold">No sessions found</div>
		{:else}
			{#each data.sessions as session, i}
				<div class="p-8 bg-white rounded-md flex flex-col gap-3 shadow-sm">
					<div class="text-xl font-semibold">
						{session.name}
					</div>
					<div class="relative overflow-x-auto">
						<table class="w-full text-sm text-left">
							<thead class="text-sm uppercase bg-gray-100 border-l border-r border-t">
								<tr>
									<th scope="col" class="px-6 py-3"> Session start </th>
									<th scope="col" class="px-6 py-3"> Session end </th>
									<th scope="col" class="px-6 py-3"> Hourly rate </th>
									<th scope="col" class="px-6 py-3"> Total hours </th>
								</tr>
							</thead>
							<tbody>
								<tr class="bg-white border-l border-r border-b">
									<th scope="row" class="px-6 py-4 font-medium text-gray-900">
										{startTimesFormatted[i]}
									</th>
									<td class="px-6 py-4"> {endTimesFormatted[i]} </td>
									<td class="px-6 py-4"> {session.hourlyRate} </td>
									<td class="px-6 py-4"> {totalHours[i]} </td>
								</tr>
							</tbody>
						</table>
					</div>
					<DeleteButton on:delete={handleDelete} session={session}/>
				</div>
			{/each}
		{/if}
	</div>
</main>
