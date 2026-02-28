<script>
	export let progress = 8;
	import { onMount } from "svelte";
	let width;
	export let data;
	import { myGlobalState } from "$lib/state.svelte.js";
	$: accent = $myGlobalState.accent;

	let book_num = data.result.filter((book) => {
		let finish_year = book.end_date?.slice(0, 4);
		return (
			book.list === "Read" &&
			finish_year === new Date().getFullYear().toString()
		);
	}).length;
</script>

<div
	class="rounded-4xl p-4 px-8"
	class:bg-neutral-800={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
	class:bg-gray-100={!$myGlobalState.darkMode}
>
	<div class="mb-2 flex items-center justify-between">
		<p>Yearly Reading Progress</p>
		<p>{(book_num/25)*100}% ({book_num}/25)</p>
	</div>
	<div class="h-4 w-full overflow-clip rounded-full bg-gray-300">
		<div
			class="h-4"
			class:bg-green-400={accent === "green"}
			class:bg-blue-400={accent === "blue"}
			class:bg-red-400={accent === "red"}
			class:bg-orange-400={accent === "orange"}
			class:bg-purple-400={accent === "purple"}
			style="width: 20%;"
		></div>
	</div>
</div>
