import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/writings")({
  beforeLoad: () => {
    throw redirect({
      to: "/journal",
    });
  },
  component: () => null,
});
