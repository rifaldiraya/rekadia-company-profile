import {
  DataGridPremium,
  DataGridPremiumProps,
  GridValidRowModel,
} from "@mui/x-data-grid-premium";

export default function CoreDataGridGrid<T extends GridValidRowModel>(
  props: DataGridPremiumProps<T>,
) {
  return <DataGridPremium autoHeight sx={{ border: "none" }} {...props} />;
}
