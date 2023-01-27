import type { PageLoad } from "./$types";

export const load = (() => {
    return {
        text: "No work hours logged yet."
    }
}) satisfies PageLoad;