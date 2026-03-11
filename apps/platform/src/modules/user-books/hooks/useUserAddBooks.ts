import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "@/routes/__root";

interface SelectBooksProps {
	userId: string;
	bookId: string;
}

export const useSelectBooks = () => {
	return useMutation({
		mutationFn: async ({ userId, bookId }: SelectBooksProps) => {
			const res = await fetch("http://localhost:8000/userbooks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId, bookId }),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			return data;
		},
		onSuccess: () => {
			toast.success("Books have been selected for reading successfully");
			queryClient.invalidateQueries({ queryKey: ["userbook"] });
		},
	});
};

export const useDeleteBooks = () => {};
