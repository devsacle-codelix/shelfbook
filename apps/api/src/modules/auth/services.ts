import bcrypt from "bcrypt";
// import { generateToken } from "./jwt";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma";
import type { LoginInput, RegisterInput } from "./schema";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function register(data: RegisterInput) {
	const existingUser = await prisma.user.findUnique({
		where: { email: data.email },
	});
	if (existingUser) throw new Error("Email Already Exist");
	const hashedPassword = await bcrypt.hash(data.password, 10);
	return prisma.user.create({
		data: {
			email: data.email,
			password: hashedPassword,
		},
		select: { id: true, email: true, createdAt: true },
	});
}

export async function login(data: LoginInput) {
	const user = await prisma.user.findUnique({
		where: { email: data.email },
	});

	if (!user) {
		throw new Error("Invalid email or password");
	}

	const passwordMatch = await bcrypt.compare(data.password, user.password);

	if (!passwordMatch) {
		throw new Error("Invalid email or password");
	}
	console.log("USER.ID:", user.id);
	// const token =  generateToken(user.id);
	const token = jwt.sign(
		{
			userId: user.id,
			email: user.email,
		},
		SECRET_KEY,
		{ expiresIn: "24h" }, // Token expire dalam 24 jam
	);
	console.log("TOKEN", token);
	return {
		token,
		user: {
			id: user.id,
			email: user.email,
			createdAt: user.createdAt,
		},
	};
}

export async function profile(userId: string) {
	return prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			email: true,
			createdAt: true,
			books: true,
		},
	});
}
