import {
  queryOptions,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

export default function constructQueryOptions<
  OutputDT,
  ParamsDT,
  TData = OutputDT,
  TError = Error,
>(
  params: ParamsDT,
  queryKey: (params: ParamsDT) => QueryKey,
  queryFn: (params: ParamsDT) => Promise<OutputDT>,
  options?: Omit<
    UseQueryOptions<OutputDT, TError, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return queryOptions({
    ...options,
    queryKey: queryKey(params),
    queryFn: () => queryFn(params),
  });
}
