import { Button } from "@shelfbook/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

	const jsonBooks = [
		{
			id: 1,
			title: "The Great Gatsby",
			description:
				"A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
			price: 10.99,
			image:
				"https://images-platform.99static.com//D7F5UkIK5fOIhNvxekofVWCD2P8=/0x843:1129x1972/fit-in/500x500/99designs-contests-attachments/87/87426/attachment_87426123",
		},
		{
			id: 2,
			title: "The Great Gatsby",
			description:
				"A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
			price: 10.99,
			image:
				"https://images-platform.99static.com//D7F5UkIK5fOIhNvxekofVWCD2P8=/0x843:1129x1972/fit-in/500x500/99designs-contests-attachments/87/87426/attachment_87426123",
		},
		{
			id: 3,
			title: "The Great Gatsby",
			description:
				"A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
			price: 10.99,
			image:
				"https://images-platform.99static.com//D7F5UkIK5fOIhNvxekofVWCD2P8=/0x843:1129x1972/fit-in/500x500/99designs-contests-attachments/87/87426/attachment_87426123",
		},
		{
			id: 4,
			title: "The Great Gatsby",
			description:
				"A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
			price: 10.99,
			image:
				"https://images-platform.99static.com//D7F5UkIK5fOIhNvxekofVWCD2P8=/0x843:1129x1972/fit-in/500x500/99designs-contests-attachments/87/87426/attachment_87426123",
		},
		{
			id: 5,
			title: "The Great Gatsby",
			description:
				"A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
			price: 10.99,
			image:
				"https://images-platform.99static.com//D7F5UkIK5fOIhNvxekofVWCD2P8=/0x843:1129x1972/fit-in/500x500/99designs-contests-attachments/87/87426/attachment_87426123",
		},
		{
			id: 6,
			title: "The Great Gatsby",
			description:
				"A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
			price: 10.99,
			image:
				"https://images-platform.99static.com//D7F5UkIK5fOIhNvxekofVWCD2P8=/0x843:1129x1972/fit-in/500x500/99designs-contests-attachments/87/87426/attachment_87426123",
		},
	];

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
						onClick={() => {}}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
				{jsonBooks.map((book) => (
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
