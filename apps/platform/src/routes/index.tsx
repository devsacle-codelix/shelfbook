import { Button } from "@shelfbook/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	console.log(import.meta.env.VITE_TEST);
	return (
		<div>
			<Button label="Click Me" />
		</div>
	);
}
