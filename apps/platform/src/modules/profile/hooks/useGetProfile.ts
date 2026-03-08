import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
	return useQuery({
		queryKey: ["me"],

		queryFn: async () => {
			const res = await fetch("http://localhost:8000/auth/me");

			if (!res.ok) {
				throw new Error("Failed to fetch profile");
			}

			const data = await res.json();
			return data.data;
		},
	});
};
