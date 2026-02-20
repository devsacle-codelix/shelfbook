import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface RegisterSchema {
	email: string;
	password: string;
}

export const useRegister = () => {
	return useMutation({
		mutationKey: [],
		mutationFn: async ({ email, password }: RegisterSchema) => {
			const res = await fetch("http://localhost:8000/auth/register", {
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
			toast.success("Registering Success, please login");
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
