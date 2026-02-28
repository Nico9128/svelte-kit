<script>
	import StatCard from '../components/StatCard.svelte';
	import BookCard from '../components/BookCard.svelte';
	import Button from '../components/Button.svelte';
	import { myGlobalState } from '$lib/state.svelte.js';
	import { Grid3x3 } from '@lucide/svelte';
	import { Rows3 } from '@lucide/svelte';
	import { CirclePlus } from '@lucide/svelte';
	export let data;
	let tags = [];
	data.result.forEach((book) => {
		if (book.tags) {
			book.tags.split(',').forEach((tag) => {
				if (!tags.includes(tag.trim()) && tag.trim() !== '') {
					tags.push(tag.trim());
				}
			});
		}
	});
</script>

<h1 class="mb-4 text-4xl">Books</h1>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="grid grid-cols-1 gap-4">
	<div
		on:click={() => {
			myGlobalState.update((state) => {
				state.listView = true;
				state.current_list = 'Currently Reading';
				return state;
			});
		}}
		class="flex cursor-pointer items-center rounded-3xl p-4"
		class:bg-gray-100={!$myGlobalState.darkMode}
		class:text-black={!$myGlobalState.darkMode}
		class:bg-neutral-800={$myGlobalState.darkMode}
		class:hover:bg-neutral-700={$myGlobalState.darkMode}
		class:hover:bg-gray-200={!$myGlobalState.darkMode}
	>
		<p class="grow text-xl">Currently Reading</p>
		<div class="flex">
			{#each data.result.filter((book) => book.coverUrl.includes('http') && book.list === 'Currently Reading') as book, i}
				{#if i < 3}
					<img src={book.coverUrl} alt="Book Cover" class="ml-4 h-24 rounded-2xl" />
				{/if}
			{/each}
		</div>
	</div>
	<div
		on:click={() => {
			myGlobalState.update((state) => {
				state.listView = true;
				state.current_list = 'Want to Read';
				return state;
			});
		}}
		class="flex cursor-pointer items-center rounded-3xl p-4"
		class:bg-gray-100={!$myGlobalState.darkMode}
		class:text-black={!$myGlobalState.darkMode}
		class:bg-neutral-800={$myGlobalState.darkMode}
		class:hover:bg-neutral-700={$myGlobalState.darkMode}
		class:hover:bg-gray-200={!$myGlobalState.darkMode}
	>
		<p class="grow text-xl">TBR</p>
		<div class="flex">
			{#each data.result.filter((book) => book.coverUrl.includes('http') && book.list === 'Want to Read') as book, i}
				{#if i < 3}
					<img src={book.coverUrl} alt="Book Cover" class="ml-4 h-24 rounded-2xl" />
				{/if}
			{/each}
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		on:click={() => {
			myGlobalState.update((state) => {
				state.listView = true;
				state.current_list = 'Read';
				return state;
			});
		}}
		class="flex cursor-pointer items-center rounded-3xl p-4"
		class:bg-gray-100={!$myGlobalState.darkMode}
		class:text-black={!$myGlobalState.darkMode}
		class:bg-neutral-800={$myGlobalState.darkMode}
		class:hover:bg-neutral-700={$myGlobalState.darkMode}
		class:hover:bg-gray-200={!$myGlobalState.darkMode}
	>
		<p class="grow text-xl">Finished</p>
		<div class="flex">
			{#each data.result.filter((book) => book.coverUrl.includes('http') && book.list === 'Read') as book, i}
				{#if i < 3}
					<img src={book.coverUrl} alt="Book Cover" class="ml-4 h-24 rounded-2xl" />
				{/if}
			{/each}
		</div>
	</div>
	<div
		on:click={() => {
			myGlobalState.update((state) => {
				state.listView = true;
				state.current_list = 'All';
				return state;
			});
		}}
		class="cursor-pointer items-center rounded-3xl p-4"
		class:bg-gray-100={!$myGlobalState.darkMode}
		class:text-black={!$myGlobalState.darkMode}
		class:bg-neutral-800={$myGlobalState.darkMode}
		class:hover:bg-neutral-700={$myGlobalState.darkMode}
		class:hover:bg-gray-200={!$myGlobalState.darkMode}
	>
		<p class="mb-4 grow text-xl">All Books</p>
		<div class="flex flex-wrap gap-4">
			{#each data.result.filter((book) => book.coverUrl.includes('http')) as book, i}
				{#if i < 8}
					<img src={book.coverUrl} alt="Book Cover" class="h-24 rounded-2xl" />
				{/if}
			{/each}
		</div>
	</div>
</div>
<p class="my-2 text-xl">Tags</p>
<div class="flex flex-wrap gap-2">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	{#each tags as tag}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class:bg-gray-300={!$myGlobalState.darkMode}
			class:text-black={!$myGlobalState.darkMode}
			class:bg-neutral-700={$myGlobalState.darkMode}
			class:hover:bg-neutral-600={$myGlobalState.darkMode}
			class:hover:bg-gray-400={!$myGlobalState.darkMode}
			class="flex cursor-pointer items-center gap-1 rounded-3xl p-2"
			on:click={() => {
				myGlobalState.update((state) => {
					state.listView = true;
					state.current_list = 'tag:' + tag;
					return state;
				});
			}}
		>
			{tag}
		</div>
	{/each}
</div>
