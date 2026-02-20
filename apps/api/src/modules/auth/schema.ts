import z from "zod";

export const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(6, "Password must be at least 6 character long"),
});

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6, "Password must be at least 6 character long"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
