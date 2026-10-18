import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getPost } from "./posts-WTOgWknE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachings._slug-Bohr5HEb.js
var $$splitComponentImporter = () => import("./teachings._slug-CXSdmH_t.mjs");
var $$splitErrorComponentImporter = () => import("./teachings._slug-CkAIOlRO.mjs");
var $$splitNotFoundComponentImporter = () => import("./teachings._slug-56wH87JM.mjs");
var Route = createFileRoute("/teachings/$slug")({
	loader: ({ params }) => {
		const post = getPost(params.slug);
		if (!post) throw notFound();
		return post;
	},
	head: ({ loaderData, params }) => {
		if (!loaderData) return { meta: [{ title: "Not found" }, {
			name: "robots",
			content: "noindex"
		}] };
		return {
			meta: [
				{ title: `${loaderData.title} — The Still Point` },
				{
					name: "description",
					content: loaderData.excerpt
				},
				{
					property: "og:title",
					content: loaderData.title
				},
				{
					property: "og:description",
					content: loaderData.excerpt
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: `/teachings/${params.slug}`
				}
			],
			links: [{
				rel: "canonical",
				href: `/teachings/${params.slug}`
			}]
		};
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
