<script>
	import { myGlobalState } from "$lib/state.svelte.js";
	import { Home } from "@lucide/svelte";
	import { ChartBar } from "@lucide/svelte";
	import { Library } from "@lucide/svelte";
	import { Settings } from "@lucide/svelte";
	import { Moon } from "@lucide/svelte";
	import { Sun } from "@lucide/svelte";
	import { Timer } from "@lucide/svelte";	
	let pages = ["home", "books", "timer", "stats", "settings"];
	let icons = [Home, Library, Timer, ChartBar, Settings];
	let accent; // Default color
	$: accent = $myGlobalState.accent; // Update when state changes
	function toggleMode(mode) {
		myGlobalState.update((state) => {
			state.editMode = false;
			state.listView = false;
			state.isTiming = false;
			state.page = mode;
			console.log(state);

			return state;
		});
	}
	function changeAccent(color) {
		myGlobalState.update((state) => {
			state.accent = color;

			return state;
		});
	}
</script>

<div
	class="flex flex-row flex-wrap px-8 md:sticky md:top-0 md:h-screen md:flex-col md:gap-0 md:py-16"
	class:bg-neutral-800={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
	class:bg-gray-100={!$myGlobalState.darkMode}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	{#each pages as page, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex max-w-full cursor-pointer text-black items-center p-4 text-lg font-bold md:p-8"
			class:rounded-t-3xl={i === 0}
			class:rounded-b-3xl={i === pages.length - 1}
			class:bg-blue-400={accent === "blue" &&
				$myGlobalState.page === page}
			class:bg-blue-200={accent === "blue" &&
				$myGlobalState.page !== page}
			class:bg-green-400={accent === "green" &&
				$myGlobalState.page === page}
			class:bg-green-200={accent === "green" &&
				$myGlobalState.page !== page}
			class:bg-red-400={accent === "red" && $myGlobalState.page === page}
			class:bg-red-200={accent === "red" && $myGlobalState.page !== page}
			class:bg-orange-400={accent === "orange" &&
				$myGlobalState.page === page}
			class:bg-orange-200={accent === "orange" &&
				$myGlobalState.page !== page}
			class:bg-purple-400={accent === "purple" &&
				$myGlobalState.page === page}
			class:bg-purple-200={accent === "purple" &&
				$myGlobalState.page !== page}
			class:hover:bg-blue-300={accent === "blue" &&
				$myGlobalState.page !== page}
			class:hover:bg-green-300={accent === "green" &&
				$myGlobalState.page !== page}
			class:hover:bg-red-300={accent === "red" &&
				$myGlobalState.page !== page}
			class:hover:bg-orange-300={accent === "orange" &&
				$myGlobalState.page !== page}
			class:hover:bg-purple-300={accent === "purple" &&
				$myGlobalState.page !== page}
			class:hover:bg-neutral-300={accent === "neutral" &&
				$myGlobalState.page !== page}
			class:bg-neutral-400={accent === "neutral" &&
				$myGlobalState.page === page}
			class:bg-neutral-200={accent === "neutral" &&
				$myGlobalState.page !== page}
			on:click={() => toggleMode(page)}
		>
			<svelte:component
				this={icons[i]}
				size={24}
				class="mr-0 inline-block md:mr-2"
			/>
			<p class="hidden md:block">
				{page.charAt(0).toUpperCase() + page.slice(1)}
			</p>
		</div>
	{/each}
	<div class="relative grow">
		<div
			class="absolute bottom-8 left-8"
			on:click={() => {
				myGlobalState.update((state) => {
					state.darkMode = !state.darkMode;
					console.log("darl");
					return state;
				});
			}}
		>
			{#if $myGlobalState.darkMode}
				<Sun size={24} class="cursor-pointer" />
			{:else}
				<Moon size={24} class="cursor-pointer" />
			{/if}
		</div>
	</div>
</div>
