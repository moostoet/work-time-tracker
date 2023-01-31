import type { Action } from 'svelte/action';

export const clickOutside: Action<
	HTMLElement,
	undefined,
	{ 'on:click_outside': (e: CustomEvent<{ detail: HTMLElement }>) => void }
> = (node) => {
	const handleClick = (event: MouseEvent) => {
		console.log(event);
		if (
			node &&
			event.target instanceof Element &&
			!node.contains(event.target) &&
			!event.defaultPrevented
		) {
			node.dispatchEvent(new CustomEvent('click_outside', { detail: node }));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
