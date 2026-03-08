import { z } from "zod";

export const userOnBookSchema = z.object({
	userId: z.number(),
	bookId: z.number(),
});

export type UserOnBookType = z.infer<typeof userOnBookSchema>;
