import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-MzZFq_Kd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listen._id-Cd4O4G0c.js
var $$splitComponentImporter = () => import("./listen._id-Dgm2emSa.mjs");
var Route = createFileRoute("/listen/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	meta: ({ params }) => {
		const item = CONTENT.find((c) => c.id === params.id);
		if (!item) return [];
		return [
			{ title: `Stillpoint — ${item.title}` },
			{
				name: "description",
				content: `${item.title} by ${item.artist_or_speaker}. ${item.description || ""} Listen on Stillpoint.`
			},
			{
				property: "og:title",
				content: `Stillpoint — ${item.title}`
			},
			{
				property: "og:description",
				content: `${item.artist_or_speaker} · ${item.channel}. For curious minds in a noisy world.`
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Stillpoint"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: `Stillpoint — ${item.title}`
			},
			{
				name: "twitter:description",
				content: `${item.artist_or_speaker} · ${item.channel}`
			}
		];
	}
});
//#endregion
export { Route as t };
