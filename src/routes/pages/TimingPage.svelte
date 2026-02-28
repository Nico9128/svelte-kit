<script>
    import { myGlobalState } from "$lib/state.svelte.js";

    let { data } = $props();
    let id = $myGlobalState.current_book;
    console.log(data);
    let book = $derived(data.result?.filter((book) => book.id === id)[0]);
    import { CircleArrowLeft, Trash } from "@lucide/svelte";
    import Button from "../components/Button.svelte";
    activeTimer=false;
    function startTimer(){
        
    }
</script>

{#if book}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div
        on:click={() => {
            myGlobalState.update((state) => {
                state.isTiming = false;
                console.log("FALSLLELE");
                return state;
            });
        }}
    >
        <CircleArrowLeft size={32} class="cursor-pointer" />
    </div>
    <div class="flex items-stretch gap-4">
        <div class="grid grow grid-cols-1">
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <p
                class="my-2 rounded-3xl pt-2 text-3xl"
                class:text-black={!$myGlobalState.darkMode}
            >
                {book["title"]}
            </p>
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <p
                type="text"
                name="author"
                value={book["author"]}
                placeholder="Author"
                class=" rounded-3xl py-2"
                class:text-black={!$myGlobalState.darkMode}
            >
                {book["author"]}
            </p>

            <img
                src={book["coverUrl"]}
                alt="Book Cover"
                class="aspect-[2/3] h-full max-h-92 rounded-2xl object-cover"
            />
        </div>
    </div>
    <div>
        <div onclick={()=>{startTimer()}}>
            <Button class="mt-4" text={"Start Timer"} />
        </div>
    </div>
{/if}
