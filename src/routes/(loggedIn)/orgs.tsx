import { createFileRoute } from "@tanstack/react-router";
import { useGetOrgs } from "@/fetchers/orgs";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/(loggedIn)/orgs")({
  component: RouteComponent,
  errorComponent: () => <h1>Oops an errors has occurred</h1>,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(useGetOrgs),
});

function RouteComponent() {
  const orgsQuery = useSuspenseQuery(useGetOrgs);
  const orgs = orgsQuery.data;
  return (
    <div>
      Hello "/orgs"!
      <br />
      <pre>{JSON.stringify(orgs, null, 2)}</pre>
    </div>
  );
}
