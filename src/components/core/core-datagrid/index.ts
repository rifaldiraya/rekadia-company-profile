import CoreDataGridGrid from "@/components/core/core-datagrid/core-datagrid-grid";
import CoreDataGridHeader from "@/components/core/core-datagrid/core-datagrid-header";
import CoreDataGridToolbar from "@/components/core/core-datagrid/core-datagrid-toolbar";
import CoreDataGridWrapper from "@/components/core/core-datagrid/core-datagrid-wrapper";
import useCoreDataGrid from "./use-core-datagrid";

export * from "./core-datagrid.enum";
export * from "./core-datagrid.interface";
export * from "./with-core-datagrid";

export { useCoreDataGrid };
export const CoreDataGrid = Object.assign(CoreDataGridWrapper, {
  Toolbar: CoreDataGridToolbar,
  Header: CoreDataGridHeader,
  Grid: CoreDataGridGrid,
});
