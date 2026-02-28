<script>
	export let text = 'Button';
	export let hasIcon = false;
	import { myGlobalState } from '$lib/state.svelte.js';
	let accent; // Default color
	$: accent = $myGlobalState.accent; // Update when state changes
	export let color = "";
</script>

<button
	class="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-black {color != '' ? color : ''}"
    class:bg-blue-300={accent === 'blue' && color == ''}
    class:bg-green-300={accent === 'green' && color == ''}
    class:bg-red-300={accent === 'red' && color == ''}
    class:bg-orange-300={accent === 'orange' && color == ''}
    class:hover:bg-blue-400={accent === 'blue' && color == ''}
    class:hover:bg-green-400={accent === 'green' && color == ''}
    class:hover:bg-red-400={accent === 'red' && color == ''}
    class:hover:bg-orange-400={accent === 'orange' && color == ''}
	class:hover:bg-purple-400={accent === 'purple' && color == ''}
	class:bg-purple-300={accent === 'purple' && color == ''}
	class:bg-neutral-300={accent === 'neutral' && color == ''}
	class:hover:bg-neutral-400={accent === 'neutral' && color == ''}

    >
	{#if hasIcon}
		<slot name="icon" />
	{/if}
	{text}
</button>
