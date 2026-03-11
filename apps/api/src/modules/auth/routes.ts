import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { verifyToken } from "./jwt";
import { loginSchema, registerSchema } from "./schema";
import { login, profile, register } from "./services";

export const auth = new Hono()
	.post("/register", zValidator("json", registerSchema), async (c) => {
		const data = c.req.valid("json");
		try {
			const user = await register(data);
			console.log("Register called");
			return c.json({ success: true, data: user }, 201);
		} catch (error) {
			console.error(error);
			throw new HTTPException(400, {
				message: `Email already exists. Error: ${error}`,
			});
		}
	})
	.post("/login", zValidator("json", loginSchema), async (c) => {
		const data = c.req.valid("json");

		try {
			const user = await login(data);
			console.log("Login called");

			return c.json({ success: true, data: user }, 200);
		} catch (error) {
			console.error(error);
			throw new HTTPException(401, {
				message: `${error}`,
			});
		}
	})
	.get("/profile", async (c) => {
		try {
			const authHeader = c.req.header("Authorization");
			console.log("AUTH HEADER:", authHeader);
			if (!authHeader) {
				throw new HTTPException(401, { message: "User is unauthorized!" });
			}
			console.log("AUTH HEADER:", authHeader);
			const token = authHeader.split(" ")[1];
			console.log("TOKEN:", token);
			const decoded = verifyToken(token);
			console.log("DECODED:", decoded);
			const user = await profile(decoded.id);
			console.log("Profile is called");
			return c.json({ success: true, data: user }, 200);
		} catch (error) {
			console.error(error);
			throw new HTTPException(500, {
				message: `Failed to fetch profile. Error: ${error}`,
			});
		}
	});
