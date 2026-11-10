import GridFilterLogic from "@/enums/grid-filter-logic";
import GridFilterOperatorEnum from "@/enums/grid-filter-operator";
import {
  GridCallbackDetails,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";

export interface DataGridResponse<T> {
  rowCount: number;
  rows: T[];
}

interface Sorts {
  Field: string;
  Direction: number;
}

interface Filter {
  Logic: GridFilterLogic | null;
  Field: string;
  Operator: GridFilterOperatorEnum;
  Value: string;
  Filters: Filter[];
}

export interface DataGridRequestBody {
  Skip: number;
  Take: number;
  Sorts: Sorts[];
  Filter: Filter[];
}

export interface ServerChildProps<T> {
  rows: T[];
  rowCount: number;
  sortModel: GridSortModel;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>,
  ) => void;
  onSortModelChange: (
    model: GridSortModel,
    details: GridCallbackDetails<any>,
  ) => void;
  loading: boolean;
}
