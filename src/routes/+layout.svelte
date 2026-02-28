<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from './components/Sidebar.svelte';

	import { myGlobalState } from '$lib/state.svelte.js';
	let { children } = $props();
</script>

<svelte:head
	><link rel="icon" href={favicon} />
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"
	></script></svelte:head
>
<div
	class="flex flex-col md:flex-row"
	class:bg-neutral-900={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
>
	<Sidebar />
	<div class="m-auto mt-4 max-w-2xl grow">
		{@render children()}
	</div>
</div>
