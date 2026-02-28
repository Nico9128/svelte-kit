<script>
    export let data;

    function howFarThroughYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear() + 1, 0, 1);
        const elapsed = now - start;
        const total = end - start;
        return (elapsed / total) * 100;
    }

    import { myGlobalState } from "$lib/state.svelte.js";

    let booksThisYear = data.result.filter((book) => {
        let finish_year = book.end_date?.slice(0, 4);
        return (
            book.list === "Read" &&
            finish_year === new Date().getFullYear().toString()
        );
    }).length;
    let pace = booksThisYear / (new Date().getMonth() + 1);
    let projected = Math.round(pace * 12);
    let year_percent = howFarThroughYear();
    projected = (1 / (parseFloat(year_percent) / 100)) * booksThisYear;
</script>
<h1 class="text-4xl mb-4">Statistics</h1>

<span class="text-xl gap-4 grid grid-cols-2">
    <p
        class:bg-gray-200={!$myGlobalState.darkMode}
        class:text-black={!$myGlobalState.darkMode}
        class:bg-neutral-800={$myGlobalState.darkMode}
        class="p-4 rounded-4xl"
        >
        {data.result.length} books loaded.
    </p>
    <p
        class:bg-gray-200={!$myGlobalState.darkMode}
        class:text-black={!$myGlobalState.darkMode}
        class:bg-neutral-800={$myGlobalState.darkMode}
        class="p-4 rounded-4xl"
        >
        You have finished {data.result.filter((book) => book.list === "Read")
            .length} books.
    </p>
    <p
        class:bg-gray-200={!$myGlobalState.darkMode}
        class:text-black={!$myGlobalState.darkMode}
        class:bg-neutral-800={$myGlobalState.darkMode}
        class="p-4 rounded-4xl"
        >
        You have finished {booksThisYear} books this year
    </p>
    <p
        class:bg-gray-200={!$myGlobalState.darkMode}
        class:text-black={!$myGlobalState.darkMode}
        class:bg-neutral-800={$myGlobalState.darkMode}
        class="p-4 rounded-4xl"
        >
        At this pace, you will finish {Math.round(projected)} books this year in total,
    </p>
</span>
