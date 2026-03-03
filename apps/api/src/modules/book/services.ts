import { prisma } from "../../utils/prisma";
import type { NewBookType } from "./schema";

export async function addBook(data: NewBookType) {
	return await prisma.book.create({
		data,
	});
}

export async function getBooks() {
	return await prisma.book.findMany();
}
