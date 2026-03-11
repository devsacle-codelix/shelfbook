import { prisma } from "../../utils/prisma";
import type { UserOnBookType } from "./schema";

export async function addBookToUser(data: UserOnBookType) {
	return await prisma.usersOnBooks.create({
		data,
	});
}

export async function getUserBook(userId: string) {
	return await prisma.usersOnBooks.findMany({
		where: {
			userId,
		},
		include: {
			book: true,
		},
	});
}

export async function removeBookFromUser(userId: string, bookId: string) {
	return await prisma.usersOnBooks.delete({
		where: {
			userId_bookId: {
				userId,
				bookId,
			},
		},
	});
}
