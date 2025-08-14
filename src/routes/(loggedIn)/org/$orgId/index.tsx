import { useGetOrg } from "@/fetchers/org";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(loggedIn)/org/$orgId/")({
  component: RouteComponent,
  params: {
    parse: (params) => ({ orgId: Number(params.orgId) }),
  },
  loader: ({ context: { queryClient }, params: { orgId } }) =>
    queryClient.ensureQueryData(useGetOrg(orgId)),
});

function RouteComponent() {
  const { orgId } = Route.useParams();
  const orgQuery = useSuspenseQuery(useGetOrg(orgId));
  const org = orgQuery.data;
  return (
    <div>
      <pre>{JSON.stringify(org, null, 2)}</pre>
    </div>
  );
}
