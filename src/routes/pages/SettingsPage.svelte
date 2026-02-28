<script>
	import { myGlobalState } from '$lib/state.svelte.js';
	let accent; // Default color
	$: accent = $myGlobalState.accent; // Update when state changes

	function changeAccent(color) {
		myGlobalState.update((state) => {
			state.accent = color;

			return state;
		});
	}
</script>

<h1 class="text-4xl">Settings</h1>

<p>Pick Accent:</p>

<div class="grid w-64 grid-cols-6">
	<div
		class="h-8 cursor-pointer rounded-l-full bg-red-500"
		on:click={() => {
			changeAccent('red');
		}}
	></div>
	<div
		class="h-8 cursor-pointer bg-orange-500"
		on:click={() => {
			changeAccent('orange');
		}}
	></div>
	<div
		class="h-8 cursor-pointer bg-green-500"
		on:click={() => {
			changeAccent('green');
		}}
	></div>
	<div
		class="h-8 cursor-pointer bg-blue-500"
		on:click={() => {
			changeAccent('blue');
		}}
	></div>
	<div
		class="h-8 cursor-pointer bg-purple-500"
		on:click={() => {
			changeAccent('purple');
		}}
	></div>
	<div
		class="h-8 cursor-pointer rounded-r-full bg-neutral-500"
		on:click={() => {
			changeAccent('neutral');
		}}
	></div>
</div>
