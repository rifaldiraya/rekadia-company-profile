import { DialogContext } from "@/context/dialog-context";
import { useContext } from "react";

const useDialog = () => useContext(DialogContext);

export default useDialog;
