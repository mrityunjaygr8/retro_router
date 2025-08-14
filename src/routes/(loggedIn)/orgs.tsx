import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetOrgs } from "@/fetchers/orgs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Table } from "@/components/retroui/Table";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import { LinkIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const Route = createFileRoute("/(loggedIn)/orgs")({
  component: RouteComponent,
  errorComponent: () => <h1>Oops an errors has occurred</h1>,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(useGetOrgs),
});

function RouteComponent() {
  dayjs.extend(relativeTime);
  const orgsQuery = useSuspenseQuery(useGetOrgs);
  const orgs = orgsQuery.data;
  if (orgsQuery.isLoading) {
    console.log("is loading");
    return <Text as="h4">Loading...</Text>;
  }
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head></Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Assets</Table.Head>
            <Table.Head>Users</Table.Head>
            <Table.Head>License End</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orgs.results.map((org) => (
            <Table.Row key={org.id}>
              <Table.Cell>
                <Link to="/org/$orgId" params={{ orgId: org.id }}>
                  <Button size="icon">
                    <LinkIcon />
                  </Button>
                </Link>
              </Table.Cell>
              <Table.Cell>{org.name}</Table.Cell>
              <Table.Cell>
                {org.asset_count}/{org.license.max_assets}
              </Table.Cell>
              <Table.Cell>
                {org.users.user_count}/{org.license.max_users}
              </Table.Cell>
              <Table.Cell>
                {dayjs(org.license.end_date).format("DD/MM/YYYY")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
