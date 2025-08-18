import api from "@/lib/api";
import type { PaginatedData } from "@/lib/types";
import constructQueryOptions from "./constructor";

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

const queryFn = async (): Promise<PaginatedData<ListOrgs>> => {
  const { data } = await api.get("/api/v1/org/");
  return data;
};

const queryKey = (_params: Params) => ["orgs"];
interface Params {}

const useGetOrgs = (params: Params) =>
  constructQueryOptions(params, queryKey, queryFn);

export { useGetOrgs };
