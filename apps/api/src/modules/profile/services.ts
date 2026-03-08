import { prisma } from "../../utils/prisma";

export async function getCurrentUser(userId: string) {
	return prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			createdAt: true,
			books: {
				include: {
					book: true,
				},
			},
		},
	});
}
