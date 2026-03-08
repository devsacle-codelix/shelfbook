import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";
import type { LoginInput, RegisterInput } from "./schema";

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

	return {
		id: user.id,
		email: user.email,
		createdAt: user.createdAt,
	};
}

export async function profile() {
	return prisma.user.findFirst({
		select: {
			id: true,
			email: true,
			createdAt: true,
			books: true,
		},
	});
}
