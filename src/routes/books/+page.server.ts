import { db } from "$lib/server/db";
import { works } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        works: await db.select().from(works)
    };
};