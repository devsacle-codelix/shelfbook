// import type React from "react";
// import { Button, Input } from "@shelfbook/ui";
// import { createFileRoute } from "@tanstack/react-router";
// import { useGetBooks } from "../modules/books/hooks/useAddBooks";

// export const Route = createFileRoute("/profile")({
// 	component: RouteComponent,
// });

// function RouteComponent() {

// 	const bookQuery = useGetBooks();
// 	// Mock data for now
// 	const user = {
// 		name: "Eko Mulyono",
// 		email: "eko.mulyono@gmail.com",
// 		avatar: "https://i.pravatar.cc/150?img=12",
// 	};

// 	const books = [
// 		{
// 			id: 1,
// 			title: "Clean Code",
// 			author: "Robert C. Martin",
// 			current_page: 20,
// 			total_page: 500,
// 			status: "ONGOING",
// 		},
// 		{
// 			id: 2,
// 			title: "The Pragmatic Programmer",
// 			author: "Andrew Hunt",
// 			current_page: 75,
// 			total_page: 255,
// 			status: "ON HOLD",
// 		},
// 		{
// 			id: 3,
// 			title: "Designing Data-Intensive Applications",
// 			author: "Martin Kleppmann",
// 			current_page: 3,
// 			total_page: 430,
// 			status: "ON HOLD",
// 		},
// 	];

// 	return (
// 		<div className="min-h-screen flex justify-center items-center bg-zinc-50">
// 			<div className="w-[420px] border border-zinc-200 rounded-xl shadow-sm bg-white overflow-hidden">
// 				{/* ===== TOP SECTION ===== */}
// 				<section className="p-6 flex flex-col items-center text-center border-b border-zinc-200">
// 					<img
// 						src={user.avatar}
// 						alt="Profile"
// 						className="w-24 h-24 rounded-full object-cover border"
// 					/>

// 					<h1 className="mt-4 text-xl font-semibold text-zinc-900">
// 						{user.name}
// 					</h1>
// 					<p className="text-sm text-zinc-500">{user.email}</p>

// 					<div className="mt-4">
// 						<Button label="Edit Profile" />
// 					</div>
// 				</section>

// 				{/* ===== BOTTOM SECTION ===== */}
// 				<section className="p-6 space-y-4">
// 					<h2 className="text-sm font-medium text-zinc-700 uppercase tracking-wide">
// 						List of Selected Books
// 					</h2>

// 					{books.length === 0 ? (
// 						<p className="text-sm text-zinc-500">No books selected yet.</p>
// 					) : (
// 						<ul className="space-y-3">
// 							{books.map((book) => (
// 								<li
// 									key={book.id}
// 									className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50"
// 								>
// 									{/* LEFT SIDE */}
// 									<div>
// 										<p className="text-sm font-medium text-zinc-900">
// 											{book.title}
// 										</p>
// 										<p className="text-xs text-zinc-500">{book.author}</p>
// 										<p className="text-sm font-medium text-zinc-900 whitespace-nowrap">
// 											<span className="text-red-500">{book.current_page}</span>{" "}
// 											out of {book.total_page} pages
// 										</p>
// 									</div>

// 									{/* RIGHT SIDE */}

// 									<div className="flex items-center gap-6">
// 										<p className="text-sm font-medium text-zinc-900 whitespace-nowrap">
// 											<span className="text-black-500">{book.status}</span>
// 										</p>

// 										<button
// 											type="button"
// 											className="text-xs text-red-500 hover:underline"
// 										>
// 											Remove
// 										</button>
// 									</div>
// 								</li>
// 							))}
// 						</ul>
// 					)}
// 				</section>
// 			</div>
// 		</div>
// 	);
// }

import { createFileRoute } from "@tanstack/react-router";
import { useGetProfile } from "@/modules/profile/hooks/useGetProfile";

export const Route = createFileRoute("/profile")({
	component: ProfilePage,
});

function ProfilePage() {
	const { data, isLoading } = useGetProfile();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="p-10">
			<h1 className="text-xl font-bold">Profile</h1>

			<p>User ID: {data?.id}</p>
			<p>Email: {data?.email}</p>

			<h2 className="mt-6 font-semibold">Books</h2>

			<ul>
				{data?.books?.map((book: any) => (
					<li key={book.id}>{book.title}</li>
				))}
			</ul>
		</div>
	);
}
