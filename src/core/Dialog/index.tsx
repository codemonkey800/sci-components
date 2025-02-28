import {
  Dialog as RawDialog,
  DialogProps as RawDialogProps,
} from "@mui/material";
import React, { ComponentType, forwardRef, useMemo } from "react";
import DialogPaper, { DialogPaperProps } from "../DialogPaper";
import { DialogContext } from "./components/common";

export { DialogContext };

interface DialogExtraProps {
  canClickOutsideClose?: boolean;
  onClose?: (event: object, reason: string) => void;
  sdsSize?: "xs" | "s" | "m" | "l";
  PaperComponent?: ComponentType<DialogPaperProps>;
  DialogComponent?: ComponentType<RawDialogProps>;
}

export type DialogProps = RawDialogProps & DialogExtraProps;

/**
 * @see https://v4.mui.com/components/dialogs/
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  props,
  ref
): JSX.Element {
  const {
    canClickOutsideClose = true,
    onClose,
    sdsSize = "m",
    PaperComponent = DialogPaper,
    ...rest
  } = props;

  const contextValue = useMemo(() => ({ sdsSize }), [sdsSize]);

  return (
    <DialogContext.Provider value={contextValue}>
      <RawDialog
        ref={ref}
        PaperComponent={PaperComponent}
        {...rest}
        onClose={(
          event: React.SyntheticEvent<Element, Event>,
          reason: string
        ) => {
          if (
            !canClickOutsideClose &&
            reason &&
            (reason === "backdropClick" || reason === "escapeKeyDown")
          )
            return;
          if (onClose) onClose(event, reason);
        }}
      />
    </DialogContext.Provider>
  );
});

export default Dialog;
