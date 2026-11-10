import { CoreDialog } from "@/components/core";
import { CoreDialogProps } from "@/components/core/core-dialog";
import { ReactNode, createContext, useState } from "react";

type MetaProps = Omit<CoreDialogProps, "onClose">;
type OpenDialogProps = Omit<MetaProps, "isOpen">;

interface DialogContextProps {
  openDialog: (props: OpenDialogProps) => void;
  closeDialog: () => void;
}

const contextInit: DialogContextProps = {
  openDialog(): void {
    throw new Error("Function not implemented.");
  },
  closeDialog(): void {
    throw new Error("Function not implemented.");
  },
};

const metaInit: MetaProps = {
  confirmCallback(): void {
    throw new Error("Function not implemented.");
  },
  isOpen: false,
  severity: undefined,
  supportText: "",
  title: "",
  cancelCallback(): void {
    throw new Error("Function not implemented.");
  },
  async onConfirm(): Promise<void> {
    throw new Error("Function not implemented.");
  },
};

export const DialogContext = createContext<DialogContextProps>(contextInit);

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [meta, setMeta] = useState<MetaProps>(metaInit);

  const closeDialog = () => {
    setMeta((prev) => ({ ...prev, isOpen: false }));

    setTimeout(() => setMeta(metaInit), 300);
  };
  const openDialog = (props: OpenDialogProps) =>
    setMeta({ isOpen: true, ...props });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <CoreDialog onClose={closeDialog} {...meta} />
    </DialogContext.Provider>
  );
}
