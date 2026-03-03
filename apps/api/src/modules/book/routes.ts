import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { newBookSchema } from "./schema";
import { addBook, getBooks } from "./services";

export const book = new Hono()

	.post("/", zValidator("json", newBookSchema), async (c) => {
		const payload = c.req.valid("json");
		const newBook = await addBook(payload);
		return c.json({ data: newBook });
	})

	.get("/", async (c) => {
		const books = await getBooks();
		return c.json({ data: books });
	});
