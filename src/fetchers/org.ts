import api from "@/lib/api";
import constructQueryOptions from "./constructor";

interface DetailOrg {
  name: string;
  id: number;
  license: {
    org: number;
    max_assets: number;
    max_users: number;
    end_date: string;
    features: Array<string>;
  };
  users: {
    user_count: number;
    admins: Array<string>;
  };
  asset_count: number;
}

interface Params {
  orgId: number;
}

const queryFn = async ({ orgId }: Params): Promise<DetailOrg> => {
  const { data } = await api.get(`/api/v1/org/${orgId}`);
  return data;
};

const queryKey = ({ orgId }: Params) => ["org", orgId];

const useGetOrg = (params: Params) =>
  constructQueryOptions(params, queryKey, queryFn);
export { useGetOrg };
