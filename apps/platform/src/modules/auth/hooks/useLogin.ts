import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface LoginSchema {
	email: string;
	password: string;
}

export const useLogin = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationKey: ["login"],
		mutationFn: async ({ email, password }: LoginSchema) => {
			const res = await fetch("http://localhost:8000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}

			return data;
		},

		onSuccess: () => {
			toast.success("Login success");
			navigate({ to: "/profile" });
		},

		onError: (err) => {
			if (err instanceof Error) {
				toast.error(err.message);
			}
		},
	});
};
