import { useGetOrg } from "@/fetchers/org";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/(loggedIn)/org/$orgId/")({
  component: RouteComponent,
  params: {
    parse: (params) => ({ orgId: Number(params.orgId) }),
  },
  loader: ({ context: { queryClient }, params: { orgId } }) =>
    queryClient.ensureQueryData(useGetOrg({ orgId })),
});

function RouteComponent() {
  const { orgId } = Route.useParams();
  const { data: org } = useSuspenseQuery(useGetOrg({ orgId }));
  return (
    <div>
      <Suspense>
        <pre>{JSON.stringify(org, null, 2)}</pre>
      </Suspense>
    </div>
  );
}
