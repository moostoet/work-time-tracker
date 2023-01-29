export function clickOutside<T extends HTMLElement>(node: T) {
    const handleClick = (event: MouseEvent) => {
        if (
            node &&
            event.target instanceof Element &&
            !node.contains(event.target) &&
            !event.defaultPrevented
        ) {
            node.dispatchEvent(new CustomEvent<T>('click_outside', { detail: node }))
        }
    }

    document.addEventListener('click', handleClick, true)

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true)
        }
    }
}