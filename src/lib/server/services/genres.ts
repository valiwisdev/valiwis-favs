import { db } from "$lib/server/db";
import { genres } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm';

/*
    INSERT:
        1. Create a new genre
*/

export const createGenre = async (name: string) => {
    return await db.insert(genres).values({ name }).returning();
}


/* 
    SELECT:
        1. Get all genres
*/

export const getGenres = async () => {
    return await db.select().from(genres);
}

/*
    DELETE:
        1. Delete a genre
*/

export const deleteGenre = async (genreId: number) => {
    return await db.delete(genres).where(eq(genres.id, genreId)).returning();
}

