import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { loginSchema, registerSchema } from "./schema";
import { register } from "./services";

export const auth = new Hono()
	.post("/register", zValidator("json", registerSchema), async (c) => {
		const data = c.req.valid("json");
		try {
			const user = await register(data);
			return c.json({ success: true, data: user }, 201);
		} catch (error) {
			console.error(error);
			throw new HTTPException(400, { message: "Email already exists" });
		}
	})
	.post("/login", zValidator("json", loginSchema), async (c) => {
		return c.json({ message: "User login successfully" });
	});
