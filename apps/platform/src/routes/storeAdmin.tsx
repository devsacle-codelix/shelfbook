import { Button, Input } from "@shelfbook/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAddBooks, useGetBooks } from "@/modules/books/hooks/useAddBooks";

export const Route = createFileRoute("/storeAdmin")({
	component: RouteComponent,
});

export type BookListType = {
	id: number;
	title: string;
	author_name: string;
	current_page: number;
	total_pages: number;
	price: number;
	image: string;
};

function RouteComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [bookProps, setBookProps] = useState({
		title: "",
		author_name: "",
		current_page: 0,
		total_pages: 0,
		price: 0,
		image: "",
	});

	const bookQuery = useGetBooks();
	const { mutate: addBooks } = useAddBooks();

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		addBooks(bookProps);
		setIsModalOpen(false);
	};

	return (
		<div className="container mx-auto">
			<div className="flex items-center justify-between mt-10 fixed top-0 left-10 right-10 bg-transparent z-10">
				<h1 className="text-2xl font-medium tracking-tight text-zinc-900 bg-white rounded-lg px-4 py-2">
					Store
				</h1>
				<div className="w-30">
					<Button
						type="button"
						disabled={false}
						label={`Add a Book`}
						onClick={() => {
							setIsModalOpen(true);
						}}
					/>
				</div>
			</div>
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-lg">
						<h2 className="text-lg font-medium tracking-tight text-zinc-900">
							Add a Book
						</h2>
						<form onSubmit={handleSubmit}>
							<Input
								id="title"
								type="text"
								placeholder="Title"
								label="Title"
								onChange={(e) =>
									setBookProps({ ...bookProps, title: e.target.value })
								}
							/>
							<br />
							<Input
								id="author_name"
								type="text"
								placeholder="Author"
								label="Author"
								onChange={(e) =>
									setBookProps({ ...bookProps, author_name: e.target.value })
								}
							/>
							<br />
							<Input
								id="price"
								type="number"
								placeholder="Price"
								label="Price"
								onChange={(e) =>
									setBookProps({ ...bookProps, price: Number(e.target.value) })
								}
							/>
							<br />
							<Input
								id="image"
								type="text"
								placeholder="Image"
								label="Image"
								onChange={(e) =>
									setBookProps({ ...bookProps, image: e.target.value })
								}
							/>
							<Button
								type="button"
								disabled={false}
								label="Close"
								onClick={() => {
									setIsModalOpen(false);
								}}
							/>
							<Button type="submit" disabled={false} label="Add Book" />
						</form>
					</div>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
				{bookQuery?.data?.map((book: BookListType) => (
					<div key={book.id} className="border border-zinc-200 rounded-lg p-4">
						<div className="w-full h-48 bg-zinc-200 rounded-lg">
							<img
								src={book.image}
								alt={book.title}
								className="w-full h-full object-cover"
							/>
						</div>
						<h2 className="text-lg font-medium tracking-tight text-zinc-900">
							{book.title}
						</h2>
						<p className="text-sm text-zinc-500"> {book.author_name} </p>
						<h2 className="text-lg font-medium tracking-tight text-zinc-900">
							${book.price}
						</h2>
					</div>
				))}
			</div>
		</div>
	);
}
