<script>
	import StatCard from "./components/StatCard.svelte";
	import BookCard from "./components/BookCard.svelte";
	import Button from "./components/Button.svelte";
	import { myGlobalState } from "$lib/state.svelte.js";
	import HomePage from "./pages/HomePage.svelte";
	import StatsPage from "./pages/StatsPage.svelte";
	import ShelfPage from "./pages/ShelfPage.svelte";
	import SettingsPage from "./pages/SettingsPage.svelte";
	import EditPage from "./pages/EditPage.svelte";
	import TimerSelect from "./pages/TimerSelectPage.svelte";
	import ListPage from "./pages/ListPage.svelte";
	// import TimingPage from './pages/TimingPage.svelte';
	export let data;
	console.log($myGlobalState.page);
	if ($myGlobalState.default_list === "") {
		myGlobalState.update((state) => {
			state.default_list = "Want to Read";
			return state;
		});
	}
	console.log(data);
	console.log("Default list:", $myGlobalState.default_list);
</script>

<div class="p-6 md:px-0 md:pt-16">
	{#if $myGlobalState.editMode === true}
		<EditPage {data} />
	{:else if $myGlobalState.listView === true}
		<ListPage {data} />
	{:else}
		{#if $myGlobalState.page === "home"}
			<HomePage {data} />
		{/if}

		{#if $myGlobalState.page === "stats"}
			<StatsPage {data} />
		{/if}
		{#if $myGlobalState.page === "timer"}
			<TimerSelect {data} />
		{/if}
		{#if $myGlobalState.page === "books"}
			<ShelfPage {data} />
		{/if}
		{#if $myGlobalState.page === "settings"}
			<SettingsPage {data} />
		{/if}
	{/if}
</div>
