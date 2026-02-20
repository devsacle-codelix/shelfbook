import { Button, Input } from "@shelfbook/ui";
import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { useRegister } from "@/modules/auth/hooks/useRegister";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate: submitRegister, isPending } = useRegister();
	function handleSubmitForm(event: React.SubmitEvent) {
		event.preventDefault();
		submitRegister({ email, password });
	}
	return (
		<div className="h-screen flex justify-center items-center ">
			<form
				className="w-[320px] p-4 space-y-6 border border-zinc-200 rounded-xl shadow-sm bg-white"
				onSubmit={handleSubmitForm}
			>
				<section className="text-center">
					<h1 className="text-2xl font-medium tracking-tight text-zinc-900">
						Create An Account
					</h1>
					<p className="text-sm text-zinc-500">Organize your books today</p>
				</section>
				<section className="space-y-2">
					<Input
						label="Email Address"
						id="email"
						type="email"
						placeholder="email@domain.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						label="Password"
						id="password"
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="py-5">
						<Button
							disabled={isPending}
							label={isPending ? "Registering..." : "Create an account"}
							type="submit"
						/>
					</div>
				</section>
			</form>
		</div>
	);
}
