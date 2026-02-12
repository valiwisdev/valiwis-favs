import { db } from '$lib/server/db';
import { works, worksToGenres, workProgress, workTypeEnum } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

type CreateWorkInput = Pick<
	typeof works.$inferInsert,
	'title' | 'type' | 'status' | 'author' | 'coverUrl' | 'synopsis' | 'totalChapters'
>;

type WorkProgressInput = typeof workProgress.$inferInsert;

type WorkType = (typeof workTypeEnum)['enumValues'][number];


/*
	INSERT:
		1. Create a new work (works table only)
		2. Link a work to a genre
        3. Link a work to progress
*/


export const createWork = async (data: CreateWorkInput) => {
	return db.insert(works).values(data).returning();
};

export const addGenreToWork = async (workId: number, genreId: number) => {
	return db
		.insert(worksToGenres)
		.values({ workId, genreId })
		.onConflictDoNothing()
		.returning();
};

export const addProgressToWork = async (data: WorkProgressInput) => {
    return db.insert(workProgress).values(data).returning();
}

/*
    SELECT:
        1. Get works progress by workId
        2. Get works by type
*/

export const getWorkProgress = async (workId: number) => {
    return db.select().from(workProgress).where(eq(workProgress.workId, workId));
}

export const getWorksByType = async (type: WorkType) => {
	return db.select().from(works).where(eq(works.type, type));
};






