<script>
	import StatCard from "../components/StatCard.svelte";
	import BookCard from "../components/BookCard.svelte";
	import Button from "../components/Button.svelte";
	import { myGlobalState } from "$lib/state.svelte.js";
	import { Grid3x3 } from "@lucide/svelte";
	import { Rows3 } from "@lucide/svelte";
	import { CirclePlus } from "@lucide/svelte";

	export let data;
	let bookAddSearchTitle = "";
	let bookAddSearchAuthor = "";
	let bookSearch = [];

	function bookAddSearch() {
		console.log(
			"Searching for book:",
			bookAddSearchTitle,
			bookAddSearchAuthor,
		);
		// Implement the search logic here, e.g., call an API to search for books
		let apiUrl = "https://openlibrary.org/search.json?";
		if (bookAddSearchTitle.trim() !== "") {
			apiUrl += "title=" + bookAddSearchTitle.replace(/ /g, "+");
		} else if (bookAddSearchAuthor.trim() !== "") {
			apiUrl += "author=" + bookAddSearchAuthor.replace(/ /g, "+");
		} else {
			apiUrl +=
				"title=" +
				bookAddSearchTitle.replace(/ /g, "+") +
				"&author=" +
				bookAddSearchAuthor.replace(/ /g, "+");
		}
		console.log(apiUrl);
		fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Display data in an HTML element
				bookSearch = data.docs || [];
				console.log("Search results:", bookSearch);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<h1 class="text-4xl">Bookshelf</h1>
<p class="mb-4">Welcome back, Nico</p>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	on:click={() => {
		myGlobalState.update((state) => {
			state.addingBook = !state.addingBook;
			return state;
		});
	}}
>
	<Button text="Add Book" hasIcon={true}
		><CirclePlus slot="icon" size={24} /></Button
	></span
>

{#if $myGlobalState.addingBook}
	<div
		class="my-4 rounded-3xl p-4"
		class:bg-neutral-800={$myGlobalState.darkMode}
		class:text-white={$myGlobalState.darkMode}
		class:bg-gray-100={!$myGlobalState.darkMode}
	>
		<h1 class="">Add Book</h1>
		<!-- BOok add form -->
		<!-- <form method="POST" action="/?/addBook">
			<div class="grid grid-cols-2">
				<input
					type="text"
					name="title"
					placeholder="Title"
					class="m-2 rounded-3xl p-2"
					class:bg-gray-200={!$myGlobalState.darkMode}
					class:text-black={!$myGlobalState.darkMode}
					class:bg-neutral-700={$myGlobalState.darkMode}
				/>
				<input
					type="text"
					name="author"
					placeholder="Author"
					class="m-2 rounded-3xl p-2"
					class:bg-gray-200={!$myGlobalState.darkMode}
					class:text-black={!$myGlobalState.darkMode}
					class:bg-neutral-700={$myGlobalState.darkMode}
				/>
				<span class="m-2">
					<Button text="Submit" formaction="?/addBook"></Button>
				</span>
			</div>
		</form> -->
		<!-- Book search form -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="grid grid-cols-2">
			<input
				type="text"
				name="title"
				placeholder="Title"
				class="m-2 rounded-3xl p-2"
				class:bg-gray-200={!$myGlobalState.darkMode}
				class:text-black={!$myGlobalState.darkMode}
				class:bg-neutral-700={$myGlobalState.darkMode}
				bind:value={bookAddSearchTitle}
			/>
			<input
				type="text"
				name="author"
				placeholder="Author"
				class="m-2 rounded-3xl p-2"
				class:bg-gray-200={!$myGlobalState.darkMode}
				class:text-black={!$myGlobalState.darkMode}
				class:bg-neutral-700={$myGlobalState.darkMode}
				bind:value={bookAddSearchAuthor}
			/>
			<!-- svelte-ignore a11y_missing_attribute -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<a
				class="m-2"
				on:click={() => {
					bookAddSearch();
				}}
			>
				<Button text="Search"></Button>
			</a>
			<!-- <input type="text" name="cover" placeholder="Cover URL" class="m-2 p-2 bg-gray-200 rounded-3xl" /> -->
			<!-- <input type="number" name="progress" placeholder="Progress %" class="m-2 p-2 bg-gray-200 rounded-3xl" /> -->
			<p>First 5 results shown.</p>
		</div>
		<div class="grid grid-cols-1 gap-4">
			{#each bookSearch.slice(0, 5) as book}
				<BookCard
					title={book.title}
					author={book.author_name
						? book.author_name[0]
						: "Unknown Author"}
					cover={book.cover_i
						? "https://covers.openlibrary.org/b/id/" +
							book.cover_i +
							"-M.jpg"
						: ""}
					id={book.key}
					layout_grid={false}
					addSearch={true}
				/>
			{/each}
		</div>
	</div>
{/if}
<div class="my-4">
	<StatCard progress={8} {data} />
</div>

<div
	class="mb-4 rounded-4xl p-4"
	class:bg-neutral-800={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
	class:bg-gray-100={!$myGlobalState.darkMode}
>
	<div class="my-4 flex items-center">
		<h1 class="grow text-2xl">Currently Reading</h1>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<p
			class="hidden cursor-pointer md:block"
			on:click={() => {
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
			{#if book.list == "Currently Reading"}
				<BookCard
					title={book.title}
					author={book.author}
					cover={book.coverUrl}
					progress={book.progress}
					id={book.id}
					layout_grid={$myGlobalState.layout_grid}
				/>
			{/if}
		{/each}
	</div>
</div>
