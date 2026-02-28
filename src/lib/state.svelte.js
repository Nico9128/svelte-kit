import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export const myGlobalState = persisted('store', {
	page: 'home',
	current_book: null,
	accent: 'blue',
	addingBook: false,
	layout_grid:true,
	editingBook: false,
	editMode:false,
	darkMode: false,
	listView: false,
	current_list: null,
	isTiming:false,
	default_list: 'Want to Read'
});
