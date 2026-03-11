import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
	return useQuery({
		queryKey: ["me"],

		queryFn: async () => {
			const token = localStorage.getItem("token");
			console.log("TOKEN :", token);
			console.log(token);
			const res = await fetch("http://localhost:8000/auth/profile", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("RES:", res);
			const text = await res.text();
			console.log("SERVER RESPONSE:", text);

			if (!res.ok) {
				console.log("RES ERROR");
				throw new Error("Failed to fetch profile");
			}

			const data = await res.json();
			console.log(data);
			return data.data;
		},
	});
};
