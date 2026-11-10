import {
  CoreDatagridFilterLogic,
  CoreDatagridFilterOperator,
  CoreDatagridSortDirection,
} from "@/components/core/core-datagrid/core-datagrid.enum";
import {
  ICoreDataGridFilter,
  ICoreDataGridPayload,
} from "@/components/core/core-datagrid/core-datagrid.interface";
import { useMemo, useReducer } from "react";

import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid-premium";

type ChangePageAction = {
  type: "change-page";
  data: GridPaginationModel;
};
type SortAction = {
  type: "sort";
  data: GridSortModel;
};
type AddFilterAction = {
  type: "add-filter";
  data: Omit<ICoreDataGridFilter, "filters" | "logic">;
};
type RemoveFilterAction = {
  type: "remove-filter";
  data: Pick<ICoreDataGridFilter, "field">;
};
type SearchAction = {
  type: "search";
  data: Pick<ICoreDataGridFilter, "field" | "value">;
};

type DispatchAction =
  | ChangePageAction
  | SortAction
  | AddFilterAction
  | RemoveFilterAction
  | SearchAction;

const initialFilter: ICoreDataGridFilter = {
  field: null,
  filters: [],
  logic: CoreDatagridFilterLogic.And,
  operator: null,
  value: null,
};
const initialBody: ICoreDataGridPayload = {
  skip: 0,
  take: 25,
  filter: initialFilter,
};

const reducer = (
  state: ICoreDataGridPayload,
  action: DispatchAction,
): ICoreDataGridPayload => {
  switch (action.type) {
    case "change-page": {
      const skip = action.data.pageSize * action.data.page;
      const take = action.data.pageSize;

      return {
        ...state,
        skip,
        take,
      };
    }
    case "sort": {
      const sorts: ICoreDataGridPayload["sorts"] = action.data.map((item) => ({
        field: item.field,
        direction:
          item.sort === "asc"
            ? CoreDatagridSortDirection.Asc
            : CoreDatagridSortDirection.Desc,
      }));

      return {
        ...state,
        skip: 0,
        sorts,
      };
    }
    case "add-filter": {
      return {
        ...state,
        skip: 0,
        filter: {
          field: null,
          filters: [
            ...state.filter.filters,
            {
              ...action.data,
              logic: null,
              filters: [],
            },
          ],
          logic: CoreDatagridFilterLogic.And,
          operator: null,
          value: null,
        },
      };
    }
    case "remove-filter": {
      return {
        ...state,
        skip: 0,
        filter: {
          field: null,
          filters: state.filter.filters.filter(
            (i) => i.field !== action.data.field,
          ),
          logic: CoreDatagridFilterLogic.And,
          operator: null,
          value: null,
        },
      };
    }
    case "search": {
      return {
        ...state,
        skip: 0,
        filter: {
          field: null,
          filters: [
            ...state.filter.filters.filter(
              (i) => i.field !== action.data.field,
            ),
            {
              field: action.data.field,
              value: action.data.value,
              operator: CoreDatagridFilterOperator.Contains,
              filters: [],
              logic: null,
            },
          ],
          logic: CoreDatagridFilterLogic.And,
          operator: null,
          value: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default function useCoreDataGrid() {
  const [state, dispatch] = useReducer(reducer, initialBody);

  const paginationModel = useMemo<GridPaginationModel>(
    () => ({
      page: state.take > 0 ? state.skip / state.take : 0,
      pageSize: state.take,
    }),
    [state.skip, state.take],
  );

  const initialState = useMemo(
    () => ({
      pagination: {
        paginationModel: {
          page: 0,
          pageSize: initialBody.take,
        },
      },
    }),
    [],
  );

  const onPaginationModelChange = (model: GridPaginationModel) => {
    dispatch({
      type: "change-page",
      data: model,
    });
  };

  const onSortModelChange = (model: GridSortModel) => {
    dispatch({
      type: "sort",
      data: model,
    });
  };

  /**
   *
   * @description This function is not a prop of the MUI datagrid
   */
  const onFilterChange = (
    model: Omit<ICoreDataGridFilter, "filters" | "logic">,
  ) => {
    const match = state.filter.filters.find((i) => i.field === model.field);

    if (match) {
      dispatch({
        type: "remove-filter",
        data: { field: model.field },
      });
    } else {
      dispatch({
        type: "add-filter",
        data: model,
      });
    }
  };

  /**
   *
   * @description This function is not a prop of the MUI datagrid
   */
  const onSearchChange = (field: string, value: string) => {
    dispatch({
      type: "search",
      data: { field, value },
    });
  };

  /**
   *
   * @description This function is not a prop of the MUI datagrid
   */
  const getFilterValue = (field: string) =>
    state.filter.filters.find((item) => item.field === field)?.value;

  return {
    state,
    paginationModel,
    onPaginationModelChange,
    onSortModelChange,
    onFilterChange,
    getFilterValue,
    onSearchChange,
    initialState,
    pageSizeOptions: [25, 50, 100],
  };
}
