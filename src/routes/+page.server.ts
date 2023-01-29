import type { PageServerLoad } from './$types';
import type { Session } from '../types/session';
// import { useQuery } from '@sveltestack/svelte-query'
import { fetchData } from '../use/fetch';
export const load = (async () => {
	return { sessions: await fetchData<Session[]>('http://localhost:8000/sessions')}
}) satisfies PageServerLoad;

// export const load = (() => {
// 	const queryResult = useQuery('sessions', () => {
//         return fetch('http://localhost:8000/sessions').then(res => res.json())
//     })
//     return { sessions: queryResult }
// }) satisfies PageServerLoad;
