export interface PaginatedData<Data> {
  results: Array<Data>;
  next: string | null;
  previous: string | null;
  current: number;
  pages: number;
  page_size: number;
  total: number;
  page_size_query_param: string;
}

export interface User {
  first_name: string;
  last_name: string;
}
