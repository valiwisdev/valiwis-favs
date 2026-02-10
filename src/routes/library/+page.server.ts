import { db } from "$lib/server/db";
import { readingList } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        readingList: await db.select().from(readingList)
    };
};