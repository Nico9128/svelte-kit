<script lang="ts">
	import { myGlobalState } from "$lib/state.svelte.js";
	import Button from "../components/Button.svelte";
	let id = $myGlobalState.current_book;
	let { data } = $props();
	console.log(data);
	let book = $derived(data.result?.filter((book) => book.id === id)[0]);
	import { X, Plus } from "@lucide/svelte";
	// Redirect if book not found
	// if (!book) {
	// 	myGlobalState.update((state) => {
	// 		state.editMode = false;
	// 		return state;
	// 	});
	// }
	import { Trash } from "@lucide/svelte";
	let tagCurrent = "";
	let tagElement;
	import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	let similarBooks = [];
	import BookCard from "../components/BookCard.svelte";
	const submitWithMoreData = ({ formData, cancel }) => {
		// Append the extra data
		formData.append("id", id);

		// Continue submission
		return async ({ result }) => {
			// Handle result without reloading
			if (result.type === "success") {
				// Re-run load function to refresh data
				await invalidateAll();
				console.log("Book updated successfully");
			}
		};
	};
	let searchingTags = $derived(() => {
		let tags = [];
		data.result.forEach((book) => {
			if (book.tags) {
				tags = tags.concat(book.tags.split(","));
			}
		});
		if (!tagCurrent) return [];
		return tags.filter((tag) =>
			tag.toLowerCase().includes(tagCurrent.toLowerCase()),
		);
	});
	import { Book, CircleArrowLeft } from "@lucide/svelte";
	async function updateBookApiId(apiIdnum) {
		const formData = new FormData();
		formData.append("id", id);
		formData.append("apiIdnum", apiIdnum);

		await fetch("/?/updateIdnum", {
			method: "POST",
			body: formData,
		});
	}
	// function getRecommendations() {
	// 	console.log("HI");
	// 	console.log(book["isbn"].replace(/-/g, ""));
	// 	if (book.apiIdnum == null || book.apiIdnum == "") {
	// 		const apiUrl =
	// 			"https://api.bigbookapi.com/search-books?isbn=" +
	// 			book["isbn"].replace(/-/g, "") +
	// 			"&api-key=INSERT_KEY_HERE";
	// 		console.log(apiUrl);
	// 		fetch(apiUrl)
	// 			.then((response) => {
	// 				if (!response.ok) {
	// 					throw new Error("Network response was not ok");
	// 				}
	// 				return response.json();
	// 			})
	// 			.then((data) => {
	// 				// Display data in an HTML element
	// 				updateBookApiId(data["books"][0][0]["id"]);
	// 				book["bookbook_id"] = data["books"][0][0]["id"];
	// 			})
	// 			.catch((error) => {
	// 				console.error("Error:", error);
	// 			});
	// 	}
	// 	console.log(
	// 		"Fetching recommendations for book ID:",
	// 		book["bookbook_id"],
	// 	);
	// 	const apiUrl =
	// 		"https://api.bigbookapi.com/" +
	// 		book["bookbook_id"] +
	// 		"/similar?api-key=83860c647a2c4435a82f075890978638&number=5";
	// 	console.log(apiUrl);
	// 	fetch(apiUrl)
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error("Network response was not ok");
	// 			}
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			// Reassign the array to trigger Svelte reactivity
	// 			similarBooks = data["similar_books"];
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 		});
	// }
	async function addTag(tag) {
		const formData = new FormData();
		formData.append("id", id);
		book["tags"] = book["tags"]
			? book["tags"] + "," + tagCurrent
			: tagCurrent;
		formData.append("tags", book["tags"]);
		await fetch("/?/addTag", {
			method: "POST",
			body: formData,
		});
		tagCurrent = "";
		tagElement.value = "";
		await invalidateAll();
	}
	function removeTag(tag) {
		const formData = new FormData();
		formData.append("id", id);
		book["tags"] = book["tags"]
			.split(",")
			.filter((t) => t !== tag)
			.join(",");
		formData.append("tags", book["tags"]);
		tagCurrent = "";
		fetch("/?/addTag", {
			method: "POST",
			body: formData,
		});
		invalidateAll();
	}
	async function deleteBook() {
		const formData = new FormData();
		formData.append("id", id);
		fetch("/?/deleteBook", {
			method: "POST",
			body: formData,
		});
		await invalidateAll();
	}
</script>

{#if book}
	<div
		on:click={() => {
			myGlobalState.update((state) => {
				state.editMode = false;
				console.log("FALSLLELE");
				return state;
			});
		}}
	>
		<CircleArrowLeft size={32} class="cursor-pointer" />
	</div>
	<form method="POST" action="/?/updateBook" use:enhance={submitWithMoreData}>
		<div class="flex items-stretch gap-4">
			<div class="grid grow grid-cols-1">
				<input
					type="text"
					name="title"
					value={book["title"]}
					placeholder="Title"
					class="my-2 rounded-3xl p-2 text-3xl"
					class:bg-gray-200={!$myGlobalState.darkMode}
					class:text-black={!$myGlobalState.darkMode}
					class:bg-neutral-700={$myGlobalState.darkMode}
				/>
				<input
					type="text"
					name="author"
					value={book["author"]}
					placeholder="Author"
					class="my-2 rounded-3xl p-2"
					class:bg-gray-200={!$myGlobalState.darkMode}
					class:text-black={!$myGlobalState.darkMode}
					class:bg-neutral-700={$myGlobalState.darkMode}
				/>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col">
						<label for="coverUrl" class="mx-2 mt-2">Cover URL</label
						>
						<input
							type="text"
							name="coverUrl"
							value={book["coverUrl"]}
							placeholder="Cover URL"
							class="my-2 rounded-3xl p-2"
							class:bg-gray-200={!$myGlobalState.darkMode}
							class:text-black={!$myGlobalState.darkMode}
							class:bg-neutral-700={$myGlobalState.darkMode}
						/>
					</div>
					<div class="flex flex-col">
						<label for="isbn" class="mx-2 mt-2">ISBN</label>
						<input
							type="text"
							name="isbn"
							value={book["isbn"]}
							placeholder="ISBN"
							class="my-2 rounded-3xl p-2"
							class:bg-gray-200={!$myGlobalState.darkMode}
							class:text-black={!$myGlobalState.darkMode}
							class:bg-neutral-700={$myGlobalState.darkMode}
						/>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col">
						<label for="start_date" class="mx-2 mt-2"
							>Start Date</label
						>
						<input
							type="date"
							name="start_date"
							value={book["start_date"]}
							placeholder="Start Date"
							class="my-2 rounded-3xl p-2"
							class:bg-gray-200={!$myGlobalState.darkMode}
							class:text-black={!$myGlobalState.darkMode}
							class:bg-neutral-700={$myGlobalState.darkMode}
						/>
					</div>
					<div class="flex flex-col">
						<label for="end_date" class="mx-2 mt-2">End Date</label>
						<input
							type="date"
							name="end_date"
							value={book["end_date"]}
							placeholder="End Date"
							class="my-2 rounded-3xl p-2"
							class:bg-gray-200={!$myGlobalState.darkMode}
							class:text-black={!$myGlobalState.darkMode}
							class:bg-neutral-700={$myGlobalState.darkMode}
						/>
					</div>
				</div>
				<select
					class="my-2 rounded-3xl p-2"
					class:bg-gray-200={!$myGlobalState.darkMode}
					class:text-black={!$myGlobalState.darkMode}
					class:bg-neutral-700={$myGlobalState.darkMode}
					name="list"
					value={book["list"]}
				>
					<option value="" disabled selected>Select List</option>
					<option value="Currently Reading">Currently Reading</option>
					<option value="Want to Read">Want to Read</option>
					<option value="Read">Read</option>
				</select>
				<div class="flex gap-4">
					<span class="my-2 flex">
						<Button text="Update"></Button>
					</span>
					<button
						type="button"
						class="my-2 flex"
						on:click={() => deleteBook()}
						aria-label="delete"
					>
						<Button hasIcon={true} text="Delete"
							><Trash slot="icon" size={16} /></Button
						>
					</button>
				</div>
			</div>
			<img
				src={book["coverUrl"]}
				alt="Book Cover"
				class="aspect-[2/3] h-full max-h-92 rounded-2xl object-cover"
			/>
		</div>
	</form>
{/if}
<label for="tags" class="mx-2 mt-2">Tags</label>
<div class="flex flex-col flex-wrap gap-2">
	<div class="flex gap-2 flex-wrap">
		<div
			class:bg-gray-200={!$myGlobalState.darkMode}
			class:text-black={!$myGlobalState.darkMode}
			class:bg-neutral-700={$myGlobalState.darkMode}
			class="flex w-min items-center gap-1 rounded-3xl p-2"
		>
			<input
				type="text"
				name="tags"
				size="8"
				placeholder="Type here"
				class="w-min bg-transparent outline-none"
				class:text-black={!$myGlobalState.darkMode}
				class:text-white={$myGlobalState.darkMode}
				bind:value={tagCurrent}
				bind:this={tagElement}
			/>
			<a
				class="cursor-pointer"
				on:click={() => {
					addTag();
				}}
			>
				<Plus size={16} />
			</a>
		</div>
		{#each (book?.tags || "").split(",") as tag}
			{#if tag !== ""}
				<div
					class:bg-gray-200={!$myGlobalState.darkMode}
					class:text-black={!$myGlobalState.darkMode}
					class:bg-neutral-700={$myGlobalState.darkMode}
					class="flex cursor-pointer items-center gap-1 rounded-3xl p-2"
					on:click={() => {
						removeTag(tag);
					}}
				>
					{tag}
					<X size={16} />
				</div>
			{/if}
		{/each}
	</div>
</div>
<h1 class="mb-4 text-2xl">Recommendations</h1>
<a
	on:click={() => {
		getRecommendations();
	}}
>
	<Button text="Reccomend Similar Books" color="bg-amber-500"></Button>
</a>
<div class="grid grid-cols-3 gap-4">
	{#each similarBooks as book}
		<BookCard title={book.title} cover={book.image} suggestion={true} />
	{/each}
</div>
