import { db } from "$lib/server/db";
import { shelves, works, shelvesToWorks} from "$lib/server/db/schema";
import { eq, and } from 'drizzle-orm';


/*  
    INSERT:
        1. Create a new shelf
        2. Add a work to a shelf
*/

export const createShelf = async (name: string) => {
    return await db.insert(shelves).values({ name }).returning();
}

export const addWorkToShelf = async (shelfId: number, workId: number) => {
    return await db.insert(shelvesToWorks).values({ shelfId, workId }).returning();
}


/*
   SELECT:
        1. Get all shelves
        2. Get all works in a shelf
*/

export const getShelves = async () => {
    return await db.select().from(shelves);
}

export const getShelfWorks = async (shelfId: number) => {
	return db
		.select({
			work: works,
		})
		.from(shelvesToWorks)
		.innerJoin(works, eq(shelvesToWorks.workId, works.id))
		.where(eq(shelvesToWorks.shelfId, shelfId));
};


/*
    DELETE:
        1. Remove a work from a shelf
        2. Delete a shelf
*/

export const removeWorkFromShelf = async (shelfId: number, workId: number) => {
    return await db.delete(shelvesToWorks).where(and(
        eq(shelvesToWorks.shelfId, shelfId),
        eq(shelvesToWorks.workId, workId)
    )).returning();
}

export const deleteShelf = async (shelfId: number) => {
    return await db.delete(shelves).where(eq(shelves.id, shelfId)).returning();
}

