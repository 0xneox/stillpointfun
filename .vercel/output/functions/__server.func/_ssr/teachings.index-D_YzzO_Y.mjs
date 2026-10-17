import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachings.index-D_YzzO_Y.js
var $$splitComponentImporter = () => import("./teachings.index-O3EiobsW.mjs");
var searchSchema = objectType({ topic: enumType([
	"Non-Duality",
	"Philosophy",
	"Technology",
	"AI",
	"God & Shiva",
	"Life",
	"Truth"
]).optional() });
var Route = createFileRoute("/teachings/")({
	validateSearch: searchSchema,
	head: () => ({
		meta: [
			{ title: "Teachings — The Still Point" },
			{
				name: "description",
				content: "A continuously unfolding library of writings, recordings, and pointers on non-dual wisdom."
			},
			{
				property: "og:title",
				content: "Teachings — The Still Point"
			},
			{
				property: "og:description",
				content: "A continuously unfolding library of writings, recordings, and pointers."
			},
			{
				property: "og:url",
				content: "/teachings"
			}
		],
		links: [{
			rel: "canonical",
			href: "/teachings"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
