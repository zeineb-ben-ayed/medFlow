export interface Column<T> {
  key: string;
  label: string;
  align?: "start" | "center" | "end";
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}
