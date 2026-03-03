import { Button } from "@shelfbook/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGetBooks } from "../modules/books/hooks/useAddBooks";
import type { BookListType } from "../routes/storeAdmin";

export const Route = createFileRoute("/store")({
	component: RouteComponent,
});

function RouteComponent() {
	const [cartCount, setCartCount] = useState(0);
	const [cartIds, setCartIds] = useState<number[]>([]);

	const handleAddToCart = (id: number) => {
		setCartCount(cartCount + 1);
		setCartIds([...cartIds, id]);
	};

	const bookQuery = useGetBooks();

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
						label={`Cart ${cartCount}`}
						onClick={() => null}
					/>
				</div>
			</div>
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
						<p className="text-sm text-zinc-500"> Book description </p>
						<h2 className="text-lg font-medium tracking-tight text-zinc-900">
							$10
						</h2>
						<Button
							type="button"
							disabled={false}
							label="Add to Cart"
							onClick={() => handleAddToCart(book.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
