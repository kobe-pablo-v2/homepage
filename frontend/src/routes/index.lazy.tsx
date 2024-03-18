import { createLazyFileRoute } from "@tanstack/react-router";
import { EvervaultCard } from "../components/ui/EvervaultCard";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="dark:bg-black" style={{ height: "100vh" }}>
			<EvervaultCard text="Pablo" subText="神戸大学プログラミングサークル" />
		</div>
	);
}
