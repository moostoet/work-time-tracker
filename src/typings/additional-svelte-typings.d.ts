declare namespace svelteHTML {
    // enhance attributes
    interface HTMLAttributes {
        'on:click_outside'?: () => void;
    }
}