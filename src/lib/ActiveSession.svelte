<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { now } from 'svelte/internal';
	import type { Session } from '../types/session';
	import { convertISODate } from '../use/time';

	let currentTime: Date = new Date();

	export let session: Session;
	let startTimeDisplay: string;
	let sessionStarted: boolean = false;

	$: startTimeDisplay = session.startTime ? convertISODate(session.startTime) : 'Not yet started';

	$: duration = session.startTime ? currentTime.getTime() - Date.parse(session.startTime) : 0;
	$: totalMinutes = Math.floor(duration / (1000 * 60));
	$: hours = Math.floor(totalMinutes / 60);
	$: minutes = totalMinutes % 60;
	$: seconds = Math.floor((duration / 1000) % 60);
	$: formattedDuration = `${hours}h ${minutes}m ${seconds}s`;

	onMount(() => {
		let updateNowTimeout: NodeJS.Timeout;

		const updateNow = () => {
			currentTime = new Date();
			updateNowTimeout = setTimeout(
				updateNow,
				1_000 - currentTime.getMilliseconds() // ms until next full second
			);
		};

		updateNow();

		return () => clearTimeout(updateNowTimeout);
	});
</script>

<div>
	<div class="p-8 flex flex-col gap-3">
		<div class="p-8 bg-white rounded-md flex flex-col gap-3 shadow-sm">
			<p class="text-xl font-semibold">
				{session.name}
			</p>
			<div class="relative overflow-x-auto">
				<table class="w-full text-sm text-left">
					<thead class="text-sm uppercase bg-gray-100 border-l border-r border-t">
						<tr>
							<th scope="col" class="px-6 py-3"> Session state </th>
							<th scope="col" class="px-6 py-3"> Session start </th>
							<th scope="col" class="px-6 py-3"> Hourly rate </th>
							<th scope="col" class="px-6 py-3"> Duration </th>
						</tr>
					</thead>
					<tbody>
						<tr class="bg-white border-l border-r border-b">
							<th scope="row" class="px-6 py-4 font-medium text-gray-900">
								{sessionStarted ? 'Started' : 'Not started'}
							</th>
							<td class="px-6 py-4">
								{session.startTime && sessionStarted ? startTimeDisplay : 'Not yet started'}
							</td>
							<td class="px-6 py-4"> {session.hourlyRate} </td>
							<td class="px-6 py-4">
								{duration && sessionStarted && duration > 0 ? formattedDuration : '0h 0m 0s'}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<form method="POST" action="?/startSession&id={session._id}" use:enhance>
					<button
						class="p-[10px] rounded-sm bg-blue-400 text-white font-semibold hover:bg-blue-500"
						type="submit"
						on:click={() => {
							sessionStarted = true;
						}}>Start Session</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
