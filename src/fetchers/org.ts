import { queryOptions } from "@tanstack/react-query";
import api from "@/lib/api";

const useGetOrg = (orgId: number) =>
  queryOptions({
    queryKey: ["org", orgId],
    queryFn: () => api.get(`/api/v1/org/${orgId}`).then((res) => res.data),
  });

export { useGetOrg };
