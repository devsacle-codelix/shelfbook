import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";
import type { RegisterInput } from "./schema";

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
