import { ActionEnum } from "@/config/access-control.config";
import { SUPER_ADMIN } from "@/constants";
import { AccessControlGeneratorResult } from "@/utils/generate-access-control";
import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";

interface AccessControlTableRowProps<T> {
  item: AccessControlGeneratorResult<T>;
  grantAllAction: (moduleName: string) => void;
  grantAccess: (moduleName: string, action: ActionEnum) => void;
  role: string;
}

export function AccessControlTableRow({
  item,
  grantAllAction,
  grantAccess,
  role,
}: AccessControlTableRowProps<any>) {
  const isIndeterminated = !!item.actions.length;

  return (
    <TableRow>
      <TableCell>
        <FormControlLabel
          label={item.name}
          control={
            <Checkbox
              disabled={role === SUPER_ADMIN}
              onChange={() => grantAllAction(item.name)}
              indeterminate={isIndeterminated}
              checked={isIndeterminated || role === SUPER_ADMIN}
            />
          }
        />
      </TableCell>
      {}
      <TableCell sx={{ textAlign: "center" }}>
        <Checkbox
          disabled={role === SUPER_ADMIN}
          checked={
            item.actions.includes(ActionEnum.Create) || role === SUPER_ADMIN
          }
          onChange={() => grantAccess(item.name, ActionEnum.Create)}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Checkbox
          disabled={role === SUPER_ADMIN}
          checked={
            item.actions.includes(ActionEnum.Read) || role === SUPER_ADMIN
          }
          onChange={() => grantAccess(item.name, ActionEnum.Read)}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Checkbox
          disabled={role === SUPER_ADMIN}
          checked={
            item.actions.includes(ActionEnum.Update) || role === SUPER_ADMIN
          }
          onChange={() => grantAccess(item.name, ActionEnum.Update)}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Checkbox
          disabled={role === SUPER_ADMIN}
          checked={
            item.actions.includes(ActionEnum.Delete) || role === SUPER_ADMIN
          }
          onChange={() => grantAccess(item.name, ActionEnum.Delete)}
        />
      </TableCell>
    </TableRow>
  );
}

export default AccessControlTableRow;
