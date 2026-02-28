<script>
	import { myGlobalState } from '$lib/state.svelte.js';
	let { data } = $props();
	let result = data.result;
	import StatCard from '../components/StatCard.svelte';
	import BookCard from '../components/BookCard.svelte';
	import Button from '../components/Button.svelte';
	import { Grid3x3 } from '@lucide/svelte';
	import { Rows3 } from '@lucide/svelte';
	import { CirclePlus } from '@lucide/svelte';
	import { CircleArrowLeft } from '@lucide/svelte';
	let searchTerm = $state('');
	console.log(
		$myGlobalState.current_list.slice(0, 4) == 'tag:' &&
			result[0].tags.split(',').includes($myGlobalState.current_list.slice(4))
	);
	let filteredBooks = $derived(
		result.filter(
			(book) =>
				(book.list === $myGlobalState.current_list ||
					$myGlobalState.current_list === 'All' ||
					($myGlobalState.current_list.slice(0, 4) == 'tag:' &&
						book.tags.split(',').includes($myGlobalState.current_list.slice(4)))) &&
				(book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					book.author.toLowerCase().includes(searchTerm.toLowerCase()))
		)
	);
</script>

<div
	on:click={() => {
		myGlobalState.update((state) => {
			state.listView = false;
			console.log('FALSLLELE');
			return state;
		});
	}}
>
	<CircleArrowLeft size={32} class="cursor-pointer" />
</div>
<h1 class="my-4 text-4xl">{$myGlobalState.current_list}</h1>

<div
	class="mb-4 rounded-4xl p-4"
	class:bg-neutral-800={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
	class:bg-gray-100={!$myGlobalState.darkMode}
>
	<div class="my-4 flex items-center">
		<h1 class="grow text-2xl">{$myGlobalState.current_list}</h1>
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
	<input
		type="text"
		placeholder="Search in list..."
		class="mb-4 w-full rounded-3xl p-2 text-black"
		class:bg-gray-200={!$myGlobalState.darkMode}
		class:text-black={!$myGlobalState.darkMode}
		class:bg-neutral-700={$myGlobalState.darkMode}
		bind:value={searchTerm}
	/>

	<div
		class="grid grid-cols-1 gap-4"
		class:md:grid-cols-1={!$myGlobalState.layout_grid}
		class:md:grid-cols-3={$myGlobalState.layout_grid}
	>
		{#each filteredBooks as book}
			<BookCard
				title={book.title}
				author={book.author}
				cover={book.coverUrl}
				progress={book.progress}
				id={book.id}
				layout_grid={$myGlobalState.layout_grid}
			/>
		{/each}
	</div>
</div>
