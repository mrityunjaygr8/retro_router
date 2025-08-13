import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/org/$orgId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orgId } = Route.useParams();
  return <div>Hello "/org/{orgId}/"!</div>;
}
