import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export interface CoreDialogProps {
  title: string;
  supportText: string;
  severity: ButtonProps["color"];
  cancelCallback?: (() => Promise<any>) | (() => any);
  confirmCallback?: (() => Promise<any>) | (() => any);
  cancelText?: string;
  confirmText?: string;
  isOpen: boolean;
  onClose: () => any;
  onConfirm: () => Promise<any>;
}

export function CoreDialog({
  title,
  supportText,
  severity,
  isOpen,
  onClose,
  onConfirm,
  cancelCallback = undefined,
  confirmCallback = undefined,
  cancelText = "No",
  confirmText = "Yes"
}: CoreDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => onClose();
  const handleCancel = () => {
    handleClose();
    if (cancelCallback) cancelCallback();
  };
  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm()
      .then(confirmCallback || ((res) => res))
      .then(handleClose)
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{supportText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="text"
          size="large"
          onClick={handleCancel}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          size="large"
          autoFocus
          color={severity}
          onClick={handleConfirm}
          loading={isLoading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

