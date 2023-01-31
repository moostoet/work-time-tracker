<script lang="ts">
	import type { Session } from '../types/session';
	import { convertISODate } from '../use/time';
	import { calculateHours } from '../use/time';
	import DeleteButton from '../lib/DeleteButton.svelte';

	export let sessions: Session[];

	// $: startTimesFormatted = sessions.map((session) =>
	// 	'startTime' in session ? convertISODate(session.startTime) : undefined
	// );
	// $: endTimesFormatted = sessions.map((session) =>
	// 	'endTime' in session ? convertISODate(session.endTime) : undefined
	// );
	// $: totalHours = sessions.map((session) =>
	// 	'startTime' in session && 'endTime' in session
	// 		? calculateHours(session.startTime, session.endTime)
	// 		: undefined
	// );
	$: startTimesFormatted = sessions.map((session) => convertISODate(session.startTime!));
	$: endTimesFormatted = sessions.map((session) => convertISODate(session.endTime!));
	$: totalHours = sessions.map((session) => calculateHours(session.startTime!, session.endTime!));

	const handleDelete = (event: CustomEvent<{ id: string }>) => {
		sessions = sessions.filter((session) => session._id !== event.detail.id);
	};
</script>

<div class="p-8 flex flex-col gap-3">
	{#if sessions.length === 0}
		<div class="text-xl font-semibold">No sessions found</div>
	{:else}
		{#each sessions as session, i}
			<div class="p-8 bg-white rounded-md flex flex-col gap-3 shadow-sm">
				<p class="text-xl font-semibold">
					{session.name}
				</p>
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
				<DeleteButton on:delete={handleDelete} {session} />
			</div>
		{/each}
	{/if}
</div>
