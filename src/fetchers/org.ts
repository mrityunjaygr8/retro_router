import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import api from "@/lib/api";

const useGetOrg = (
  { orgId }: { orgId: number },
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) =>
  queryOptions({
    ...options,
    queryKey: ["org", orgId],
    queryFn: () => api.get(`/api/v1/org/${orgId}`).then((res) => res.data),
  });

export { useGetOrg };
