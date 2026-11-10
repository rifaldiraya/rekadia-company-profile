import useCoreDataGrid from "@/components/core/core-datagrid/use-core-datagrid";
import httpClient from "@/utils/http-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo } from "react";

export interface WithCoreDataGridProps<D>
  extends ReturnType<typeof useCoreDataGrid> {
  query: UseQueryResult<AxiosResponse<D[]>>;
  rowCount: number;
}
interface HOCProps {
  queryKey: string[];
  url: string;
}

export function withCoreDataGrid<
  D,
  T extends WithCoreDataGridProps<D> = WithCoreDataGridProps<D>,
>(WrappedComponent: React.ComponentType<T>, hocProps: HOCProps) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function ComponentWithCoreDataGrid(
    props: Omit<T, keyof WithCoreDataGridProps<D>>,
  ) {
    const extraProps = useCoreDataGrid();
    const { state } = extraProps;
    const { take, skip, sorts, filter } = state;
    const enabled = useMemo(
      () => typeof take === "number" && typeof skip === "number",
      [take, skip],
    );

    const query = useQuery<AxiosResponse<D[]>>({
      queryKey: [
        ...hocProps.queryKey,
        take,
        skip,
        JSON.stringify(filter),
        JSON.stringify(sorts),
      ],
      queryFn: () => httpClient.post<D[]>(hocProps.url, state),
      enabled,
    });

    const rowCount = Number(query.data?.headers?.rowcount ?? 0);

    return (
      <WrappedComponent
        {...(props as T)}
        {...extraProps}
        query={query}
        rowCount={rowCount}
      />
    );
  }

  ComponentWithCoreDataGrid.displayName = `withCoreDataGrid(${displayName})`;

  return ComponentWithCoreDataGrid;
}
