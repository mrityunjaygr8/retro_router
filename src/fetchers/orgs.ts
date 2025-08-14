import { queryOptions } from "@tanstack/react-query";
import api from "@/lib/api";

const useGetOrgs = queryOptions({
  queryKey: ["orgs"],
  queryFn: () => api.get("/api/v1/org/").then((res) => res.data),
});

export { useGetOrgs };
