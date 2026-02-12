import {
	boolean,
	index,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	real,
	serial,
	text,
	timestamp
} from 'drizzle-orm/pg-core';

export const workTypeEnum = pgEnum('work_type', ['book', 'manhwa', 'manhua']);
export const workStatusEnum = pgEnum('work_status', ['ongoing', 'completed', 'hiatus', 'dropped']);
export const progressStatusEnum = pgEnum('progress_status', [
	'reading',
	'completed',
	'on_hold',
	'plan_to_read',
	'dropped'
]);

export const works = pgTable(
	'works',
	{
		id: serial('id').primaryKey(),
		title: text('title').notNull(),
		type: workTypeEnum('type').notNull(),
		status: workStatusEnum('status').notNull().default('ongoing'),
		author: text('author'),
		coverUrl: text('cover_url'),
		synopsis: text('synopsis'),
		totalChapters: integer('total_chapters'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => [index('works_title_idx').on(table.title), index('works_type_idx').on(table.type)]
);

export const genres = pgTable('genres', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique()
});

export const worksToGenres = pgTable(
	'works_to_genres',
	{
		workId: integer('work_id')
			.notNull()
			.references(() => works.id, { onDelete: 'cascade' }),
		genreId: integer('genre_id')
			.notNull()
			.references(() => genres.id, { onDelete: 'cascade' })
	},
	(table) => [primaryKey({ columns: [table.workId, table.genreId] })]
);

export const shelves = pgTable('shelves', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const shelvesToWorks = pgTable(
	'shelves_to_works',
	{
		shelfId: integer('shelf_id')
			.notNull()
			.references(() => shelves.id, { onDelete: 'cascade' }),
		workId: integer('work_id')
			.notNull()
			.references(() => works.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		primaryKey({ columns: [table.shelfId, table.workId] }),
		index('shelves_to_works_shelf_idx').on(table.shelfId),
		index('shelves_to_works_work_idx').on(table.workId)
	]
);

export const workProgress = pgTable(
	'work_progress',
	{
		workId: integer('work_id')
			.primaryKey()
			.references(() => works.id, { onDelete: 'cascade' }),
		status: progressStatusEnum('status').notNull().default('plan_to_read'),
		currentChapter: integer('current_chapter').notNull().default(0),
		rating: real('rating'),
		isFavorite: boolean('is_favorite').notNull().default(false),
		notes: text('notes'),
		startedAt: timestamp('started_at'),
		finishedAt: timestamp('finished_at'),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('work_progress_status_idx').on(table.status),
		index('work_progress_rating_idx').on(table.rating)
	]
);
