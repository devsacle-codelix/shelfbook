import { z } from "zod";

export const newBookSchema = z.object({
	title: z.string(),
	author_name: z.string(),
	current_page: z.number(),
	total_pages: z.number(),
	price: z.number(),
	image: z.string(),
});

export type NewBookType = z.infer<typeof newBookSchema>;
