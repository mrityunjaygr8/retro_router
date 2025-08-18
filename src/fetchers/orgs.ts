import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import api from "@/lib/api";
import type { PaginatedData } from "@/lib/types";

interface ListOrgs {
  id: number;
  name: string;
  license: {
    org: number;
    max_assets: number;
    max_users: number;
    end_date: string;
    features: Array<string>;
  };
  asset_count: number;
  users: {
    user_count: number;
  };
}

const useGetOrgs = <TData = PaginatedData<ListOrgs>, TError = Error>(
  options?: Omit<
    UseQueryOptions<PaginatedData<ListOrgs>, TError, TData>,
    "queryKey" | "queryFn"
  >,
) =>
  queryOptions({
    ...options,
    queryKey: ["orgs"],
    queryFn: async (): Promise<PaginatedData<ListOrgs>> => {
      const { data } = await api.get("/api/v1/org/");
      return data;
    },
  });

export { useGetOrgs };
