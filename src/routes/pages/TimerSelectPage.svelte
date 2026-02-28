<script>
	import { onMount } from "svelte";
	import { myGlobalState } from "$lib/state.svelte.js";
	import TimerPage from "./TimerSelectPage.svelte";
	import BookCard from "../components/BookCard.svelte";
	export let data;
	import { Grid3x3 } from "@lucide/svelte";
	import { Rows3 } from "@lucide/svelte";
	import Button from "../components/Button.svelte";
    import { invalidateAll } from "$app/navigation";
	invalidateAll();
	let current_book;
	let timing_on = false;
	let reading_time = 0;
	function setbook(book) {
		myGlobalState.update((state) => {
			state.isbook = true;
			return state;
		});
		reading_time =
			data.result.filter((b) => b.id === book.id)[0].reading_time || 0;
		current_book = book;
		reading_time = parseInt(current_book.reading_time) || 0;
	}

	function saveReadingTime() {
		const formData = new FormData();
		formData.append("id", current_book['id']);
		console.log("Current book ID:", current_book);
		formData.append("reading_time", reading_time);
		console.log("Saving reading time:", reading_time, "for book:", current_book);
		fetch("/?/updateReadingTime", {
			method: "POST",
			body: formData,
		});
	}
	function startTimer() {
		timing_on = true;
		console.log("Starting timer for:", current_book);
		const timerInterval = setInterval(() => {
			reading_time++;
			if (reading_time % 10 === 0) {
				// Save reading time to database every 60 seconds
				saveReadingTime();
			}
		}, 1000);
	}
</script>

<h1 class="text-4xl mb-4">Timer</h1>
<div
	class="mb-4 rounded-4xl p-4"
	class:bg-neutral-800={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
	class:bg-gray-100={!$myGlobalState.darkMode}
>
	<div class="my-4 flex items-center">
		<h1 class="grow text-2xl">Choose book TO TIME</h1>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<p
			class="hidden cursor-pointer md:block"
			onclick={() => {
				myGlobalState.update((state) => {
					state.layout_grid = !state.layout_grid;
					return state;
				});
			}}
		>
			{#if $myGlobalState.layout_grid}
				<Rows3 size={24} />
			{:else}
				<Grid3x3 size={24} />
			{/if}
		</p>
	</div>
	<div
		class="grid grid-cols-1 gap-4"
		class:md:grid-cols-1={!$myGlobalState.layout_grid}
		class:md:grid-cols-3={$myGlobalState.layout_grid}
	>
		{#each data.result as book}
			<!-- svelte-ignore a11y_missing_attribute -->
			<!-- svelte-ignore a11y_missing_attribute -->
			{#if book.list == "Currently Reading"}
				<!-- svelte-ignore a11y_missing_attribute -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					onclick={() => {
						setbook(book);
					}}
				>
					<BookCard
						title={book.title}
						author={book.author}
						cover={book.coverUrl}
						progress={book.progress}
						id={book.id}
						layout_grid={$myGlobalState.layout_grid}
						noClick={true}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>
{#if current_book != null}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class:bg-neutral-800={$myGlobalState.darkMode}
		class:text-white={$myGlobalState.darkMode}
		class:bg-gray-100={!$myGlobalState.darkMode}
		class="p-4 rounded-4xl"
	>
		<h1 class="text-2xl">Time {current_book["title"]}</h1>
		<p>{Math.floor(reading_time/3600)} hours, {Math.floor((reading_time%3600)/60)} minutes, {reading_time%60} seconds</p>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div onclick={() => startTimer()}>
			<Button class="mt-4" text={"Start Timer"} />
		</div>
	</div>
{/if}
