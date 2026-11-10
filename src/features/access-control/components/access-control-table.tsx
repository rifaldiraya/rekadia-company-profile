import { ActionEnum, actions } from "@/config/access-control.config";
import { AccessControlTableRow } from "@/features/access-control/components/access-control-table-row";
import { AccessControlGeneratorResult } from "@/utils/generate-access-control";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.05)",
        zIndex: 1,
        borderRadius: ({ shape }) => `${shape.borderRadius}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

interface AccessControlTableProps {
  grantAccess: (moduleName: string, action: ActionEnum) => void;
  grantAllAccess: (moduleName: string) => void;
  controlState: AccessControlGeneratorResult<unknown>[];
  role: string;
  loading: boolean;
}

function AccessControlTable({
  grantAccess,
  grantAllAccess,
  controlState,
  role,
  loading,
}: AccessControlTableProps) {
  return (
    <TableContainer sx={{ position: "relative" }}>
      <Table sx={{ ".MuiTableCell-root": { borderBottom: "none" } }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {/* {actions.map((action, x) => (
                <TableCell
                  key={x}
                  sx={{ textAlign: "center", textTransform: "capitalize" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Box>
                      <FormControlLabel
                        sx={{ flexDirection: "column-reverse", ml: 0, mr: 0 }}
                        label={action}
                        control={<Checkbox />}
                      />
                    </Box>
                  </Box>
                </TableCell>
              ))} */}
            {actions.map((action) => (
              <TableCell
                sx={{ textAlign: "center", textTransform: "capitalize" }}
                key={action}
              >
                {action}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {controlState.map((item) => (
            <AccessControlTableRow
              role={role}
              grantAccess={grantAccess}
              grantAllAction={grantAllAccess}
              item={item}
              key={`${String(item.actions)}-${item.name}`}
            />
          ))}
        </TableBody>
      </Table>
      {loading && <Loading />}
    </TableContainer>
  );
}

export default AccessControlTable;
