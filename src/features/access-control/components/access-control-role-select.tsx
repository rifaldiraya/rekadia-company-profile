import { CoreSelect } from "@/components/core/form";
import useGetRoles from "@/features/roles/hook/use-get-roles";
import { Dispatch, SetStateAction } from "react";

interface AccessControlRoleSelectProps {
  setRole: Dispatch<SetStateAction<string>>;
  role: string;
}

export default function AccessControlRoleSelect({
  role,
  setRole,
}: AccessControlRoleSelectProps) {
  const { data, isLoading } = useGetRoles();

  return (
    <CoreSelect
      fullWidth
      size="small"
      label="Role"
      loading={isLoading}
      value={role}
      onChange={(event) => setRole(event.target.value as any)}
      _formControl={{ sx: { maxWidth: "300px", width: "100%", ml: "auto" } }}
    >
      {data?.data.map((item) => (
        <CoreSelect.Item key={item.name} value={item.name}>
          {item.name}
        </CoreSelect.Item>
      ))}
    </CoreSelect>
  );
}
