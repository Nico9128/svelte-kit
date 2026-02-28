import { db } from '$lib/server/db';
// importing the user table
import { book } from '$lib/server/db/schema';
// actions are used to insert into database
import type { Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { myGlobalState } from '$lib/state.svelte';
export const load = async () => {
	const result = await db.select().from(book);
	return {
		result: result.reverse()
	};
};

async function getCover(title, author) {
	const url = `https://bookcover.longitood.com/bookcover?book_title=${title.replace(/ /g, '+')}&author_name=${author.replace(/ /g, '+')}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result['url'];
	} catch (error) {
		console.error(error.message);
		return '';
	}
}
export const actions = {
	addBook: async ({ cookies, request }) => {
		const data = request.formData();

		const title = (await data).get('title');
		const author = (await data).get('author');
		const list = (await data).get('list');
		console.log(list);
		const coverUrl = (await data).get('coverUrl');
		// console.log("Cover URL:", coverUrl);
		// const progress = (await data).get('progress');
		// // @ts-ignore (works fine but gives error)
		await db
			.insert(book)
			.values({
				title: title,
				author: author,
				coverUrl: coverUrl,
				progress: '',
				isbn: '',
				list: list,
				tags: '',
				bookbook_id: '',
				pages: 0,
				start_date: null,
				end_date: null,
				rating: null,
				genres: '',
				description: '',
				published_date: ''
			})
			.returning();
	},
	updateBook: async ({ cookies, request }) => {
		const data = request.formData();

		const id = (await data).get('id');
		const title = (await data).get('title');
		const author = (await data).get('author');
		const isbn = (await data).get('isbn');
		const coverUrl = (await data).get('coverUrl');
		const list = (await data).get('list');
		const tags = (await data).get('tags');
		// const pages = parseInt((await data).get('pages'));
		const start_date = (await data).get('start_date') || null;
		const end_date = (await data).get('end_date') || null;
		// const rating = parseInt((await data).get('rating')) || null;
		// const genres = (await data).get('genres');
		// const description = (await data).get('description');
		// const published_date = (await data).get('published_date');

		await db
			.update(book)
			.set({
				title: title,
				author: author,
				coverUrl: coverUrl,
				isbn: isbn,
				list: list,
				tags: '',
				pages: 0,
				start_date: start_date,
				end_date: end_date,
				rating: 0,
				genres: '',
				description: '',
				published_date: ''
			})
			.where(eq(book.id, parseInt(id as string)));
	},
	updateIdnum: async ({ cookies, request }) => {
		const data = request.formData();

		const id = (await data).get('id');
		const apiIdnum = (await data).get('apiIdnum');

		await db
			.update(book)
			.set({ bookbook_id: apiIdnum })
			.where(eq(book.id, parseInt(id as string)));
	},
	addTag: async ({ cookies, request }) => {
		const data = request.formData();
		console.log('Adding tag...');
		const id = (await data).get('id');
		const tags = (await data).get('tags');

		await db
			.update(book)
			.set({ tags: tags })
			.where(eq(book.id, parseInt(id as string)));
	},
	deleteBook: async ({ cookies, request }) => {
		const data = request.formData();
		const id = (await data).get('id');
		await db.delete(book).where(eq(book.id, parseInt(id as string)));
	},
	updateReadingTime: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('Adding time...');
		const id = data.get('id');
		const reading_time = data.get('reading_time');
		console.log('id:', id, 'reading_time:', reading_time);
		await db
			.update(book)
			.set({ reading_time: parseInt(reading_time as string) })
			.where(eq(book.id, parseInt(id as string)));
	},
	// @ts-ignore (works fine but gives error)
} satisfies Actions;
