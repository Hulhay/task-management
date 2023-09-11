export interface IMeta {
  code: number;
  message: string;
  pagination: IPagination | null;
}

export interface IPagination {
  page?: number;
  size?: number;
  total_data?: number;
  total_page?: number;
}
