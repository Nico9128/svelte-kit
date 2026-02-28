import { desc } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const book = sqliteTable('book', {
	  id: integer('id').primaryKey({ autoIncrement: true }),
	  title: text('title').notNull(),
	  author: text('author').notNull(),
	  progress: integer('progress').notNull(),
	  isbn: text('isbn').notNull(),
	  coverUrl: text('cover_url').notNull(),
	  list: text('list').notNull(),
	  tags: text('tags').notNull(),
	  bookbook_id: text('bookbook_id').notNull(),
	  pages: integer('pages').notNull(),
	  start_date: text('start_date'),
	  end_date: text('end_date'),
	  rating: integer('rating'),
	  genres: text('genres'),
	  description: text('description'),
	  published_date: text('published_date'),
	  reading_time: integer('reading_time'),
});
