export interface ResponseApi<Data> {
  message: string;
  data?: Data;
}

export interface ResponseApiWithPagination<Data> {
  message: string;
  data?: Data;
  limit: number;
  page: number;
  total_page: number;
}
