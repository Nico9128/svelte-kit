<script>
	export let progress = null;
	export let title = "";
	export let author = "";
	export let cover = "";
	export let id = "";
	import Button from "./Button.svelte";
	export let layout_grid = undefined;
	import { CirclePlus } from "@lucide/svelte";
	import { myGlobalState } from "$lib/state.svelte.js";
	let accent; // Default color
	$: accent = $myGlobalState.accent; // Update when state changes
	$: effective_layout_grid = layout_grid ?? $myGlobalState.layout_grid;
	const colorMap = {
		red: "bg-red-400",
		green: "bg-green-400",
		blue: "bg-blue-400",
		orange: "bg-orange-400",
	};
	import { onMount } from "svelte";
	let width;
	let searchAddBtn;
	let image;
	let bar_element;
	let bar_inside;
	let edit_btn;
	export let suggestion = false;
	export let addSearch = false;
	export let noClick = false;
	import { Pencil } from "@lucide/svelte";
	import { invalidateAll } from "$app/navigation";

	async function addBook() {
		const formData = new FormData();
		formData.append("title", title);
		formData.append("author", author);
		formData.append("coverUrl", cover);
		formData.append("list", $myGlobalState.default_list);
		console.log("list:", $myGlobalState.accent);
		fetch("/?/addBook", {
			method: "POST",
			body: formData,
		});
		await invalidateAll();
	}
	onMount(() => {
		if (!cover.includes("http")) return;
		const colorThief = new ColorThief();
		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = cover;
		img.onload = () => {
			const colors = colorThief.getPalette(img, 6);
			try {
				image.style.backgroundColor = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;
				image.style.color = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
				if (searchAddBtn) {
					searchAddBtn.style.backgroundColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
					searchAddBtn.style.color = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;
				}
				if (!(progress === null || progress === 100)) {
					bar_inside.style.backgroundColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
					bar_element.style.backgroundColor = `rgb(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]})`;
					bar_inside.style.backgroundColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
				}

				image.style.color = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
			} catch (e) {
				console.error("Error applying colors:", e);
			}
			// edit_btn.style.backgroundColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;
			// edit_btn.style.color = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;

			// console.log(image);
			// console.log(colors);
		};
	});
	function editTime() {
		console.log("EDIT");
		myGlobalState.update((state) => {
			state.current_book = id;
			state.modes["editBook"] = true;
			return state;
		});
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="text-md flex cursor-pointer items-center gap-4 rounded-4xl p-4"
	class:bg-neutral-700={$myGlobalState.darkMode}
	class:text-white={$myGlobalState.darkMode}
	class:bg-gray-200={!$myGlobalState.darkMode}
	bind:this={image}
	class:md:flex-col={effective_layout_grid || suggestion}
	class:md:items-start={effective_layout_grid || suggestion}
	on:click={() => {
		if (suggestion || addSearch || noClick) return;
		
			myGlobalState.update((state) => {
				state.editMode = true;
				state.current_book = id;
				return state;
			});
	}}
>
	<div class="relative">
		<!-- <div
			on:click={() => {
				myGlobalState.update((state) => {
					state.current_book = id;
					state.editingBook = true;
					return state;
				});
			}}
			class="invisible absolute top-4 right-4 flex w-max cursor-pointer items-center gap-2 rounded-full p-2"
			bind:this={edit_btn}
			class:md:visible={effective_layout_grid}
		>
			<Pencil size={16} />
			<p>Edit</p>
		</div> -->
		{#if cover.includes("http")}
			<img
				id="book-cover"
				src={`${cover}`}
				alt="Book Cover"
				class="min-w-24 rounded-2xl"
				class:md:max-h-64={effective_layout_grid || suggestion}
				class:md:max-w-full={effective_layout_grid || suggestion}
				class:max-w-24={!(effective_layout_grid || suggestion)}
			/>
		{:else}
			<div
				class="aspect-2/3 min-w-24 rounded-2xl"
				class:bg-gray-300={!$myGlobalState.darkMode}
				class:bg-neutral-600={$myGlobalState.darkMode}
				class:md:min-h-64={effective_layout_grid || suggestion}
				class:md:w-full={effective_layout_grid || suggestion}
			></div>
		{/if}
	</div>

	<div class="grow">
		<div
			class="flex items-start"
			class:flex-col={effective_layout_grid || suggestion}
		>
			<div class="grow">
				<p class="text-xl">{title}</p>
				<p class="text-md italic">{author}</p>
			</div>
		</div>
		<div
			class="flex items-center gap-4 rounded-full py-2"
			class:flex-col={effective_layout_grid || suggestion}
		>
			<div
				class="h-4 w-full overflow-clip rounded-full bg-gray-300"
				bind:this={bar_element}
			>
				<div
					class="h-4"
					style="width: 20%;"
					bind:this={bar_inside}
					class:bg-green-400={accent === "green"}
					class:bg-blue-400={accent === "blue"}
					class:bg-red-400={accent === "red"}
					class:bg-orange-400={accent === "orange"}
					class:bg-purple-400={accent === "purple"}
				></div>
			</div>
			{#if progress !== null && progress !== 100}
				<div class="w-max min-w-max">
					<p class="mt-1 text-sm">{progress}% completed</p>
				</div>
			{/if}
		</div>
		{#if addSearch}
			<div
				class="flex w-fit cursor-pointer items-center gap-2 rounded-full px-4 py-2"
				bind:this={searchAddBtn}
				on:click={() => {
					addBook();
				}}
			>
				Add Edition
				<CirclePlus size={16} />
			</div>
		{/if}
	</div>
</div>
