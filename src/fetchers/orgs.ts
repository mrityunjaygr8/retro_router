import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import api from "@/lib/api";

const useGetOrgs = (options?: Omit<UseQueryOptions, "queryKey" | "queryFn">) =>
  queryOptions({
    ...options,
    queryKey: ["orgs"],
    queryFn: () => api.get("/api/v1/org/").then((res) => res.data),
  });

export { useGetOrgs };
