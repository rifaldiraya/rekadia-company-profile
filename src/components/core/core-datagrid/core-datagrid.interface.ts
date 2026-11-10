import {
  CoreDatagridFilterLogic,
  CoreDatagridFilterOperator,
  CoreDatagridSortDirection,
} from "@/components/core/core-datagrid/core-datagrid.enum";

export interface ICoreDataGridFilter {
  logic: CoreDatagridFilterLogic | null;
  field: string | null;
  operator: CoreDatagridFilterOperator | null;
  value: string | null;
  filters: ICoreDataGridFilter[];
}

export interface ICoreDataGridSort {
  field: string;
  direction: CoreDatagridSortDirection;
}

export interface ICoreDataGridPayload {
  skip: number;
  take: number;
  sorts?: ICoreDataGridSort[];
  filter: ICoreDataGridFilter;
}
