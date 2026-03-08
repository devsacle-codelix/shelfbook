import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { userOnBookSchema } from "./schema";
import { addBookToUser } from "./services";

export const userOnBook = new Hono().post(
	"/",
	zValidator("json", userOnBookSchema),
	async (c) => {
		const payload = c.req.valid("json");
		const newUserOnBook = await addBookToUser(payload);
		return c.json({ data: newUserOnBook });
	},
);
// .get("/", async (c) => {
//     const userOnBooks = await getUserBook();
//     return c.json({ data: userOnBooks })
// }

// )
// .delete("/",

// )
