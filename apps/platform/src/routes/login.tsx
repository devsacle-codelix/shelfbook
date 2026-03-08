import { Button, Input } from "@shelfbook/ui";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { useLogin } from "@/modules/auth/hooks/useLogin";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate: submitLogin, isPending } = useLogin();

	function handleSubmitForm(e: React.FormEvent) {
		e.preventDefault();
		submitLogin({ email, password });
	}

	return (
		<div className="h-screen flex justify-center items-center">
			<form
				className="w-[320px] p-4 space-y-6 border border-zinc-200 rounded-xl shadow-sm bg-white"
				onSubmit={handleSubmitForm}
			>
				<section className="text-center">
					<h1 className="text-2xl font-medium">Login</h1>
				</section>

				<section className="space-y-2">
					<Input
						label="Email"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						label="Password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className="py-5">
						<Button
							disabled={isPending}
							label={isPending ? "Logging in..." : "Login"}
							type="submit"
						/>
					</div>
				</section>
			</form>
		</div>
	);
}
