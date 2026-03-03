import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "@/routes/__root";

interface AddBooksProps {
	title: string;
	author_name: string;
	total_pages: number;
	price: number;
	image: string;
}

export const useAddBooks = () => {
	return useMutation({
		mutationFn: async ({
			title,
			author_name,
			total_pages,
			price,
			image,
		}: AddBooksProps) => {
			const res = await fetch("http://localhost:8000/books", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, author_name, total_pages, price, image }),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			return data;
		},
		onSuccess: () => {
			toast.success("Book added successfully");
			queryClient.invalidateQueries({ queryKey: ["books"] });
		},
		onError: (err) => {
			if (err instanceof Error) {
				toast.error(err.message);
				return;
			}
			const error = err as { error: string };
			toast.error(error.error);
		},
	});
};

export const useGetBooks = () => {
	return useQuery({
		queryKey: ["books"],
		queryFn: async () => {
			const res = await fetch("http://localhost:8000/books");
			const data = await res.json();
			return data.data;
		},
	});
};
