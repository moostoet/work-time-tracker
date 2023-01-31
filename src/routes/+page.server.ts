import type { PageServerLoad } from './$types';
import type { Session } from '../types/session';
import type { Actions } from '@sveltejs/kit';
// import { useQuery } from '@sveltestack/svelte-query'
import { fetchData } from '../use/fetch';
export const load = (async () => {
	return { sessions: await fetchData<Session[]>('http://localhost:8000/sessions') };
}) satisfies PageServerLoad;

export const actions: Actions = {
	sessions: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('sessionName');
		const hourlyRate = data.get('hourlyRate');
		const session = { name, hourlyRate };
		const response = await fetch('http://localhost:8000/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(session)
		});
		return {
			status: response.status
		};
	},
	startSession: async ({ url }) => {
		const id = url.searchParams.get('id');
		const res = await fetch(`http://localhost:8000/sessions/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const session: Session = await res.json();
		session.startTime = new Date().toISOString();

		const response = await fetch(`http://localhost:8000/sessions/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(session)
		});

		return {
			status: response.status
		};
	}
};

// export const load = (() => {
// 	const queryResult = useQuery('sessions', () => {
//         return fetch('http://localhost:8000/sessions').then(res => res.json())
//     })
//     return { sessions: queryResult }
// }) satisfies PageServerLoad;
