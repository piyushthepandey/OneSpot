import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { closeToast } from "../../redux/slices/common-toast-slice";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// This is a toast message component as per material UI documentation
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert variant="filled" ref={ref} elevation={5} {...props} />;
});

export default function PositionedSnackbar() {
  const dispatch = useDispatch();
  const { toastMessage } = useSelector((state: any) => state);

  console.log(toastMessage, "toastMessage");
  useEffect(() => {
    // Automatically close the toast after 3000 milliseconds
    const autoCloseTimer = setTimeout(() => {
      if (toastMessage.open) {
        dispatch(closeToast());
      }
    }, 3000);

    return () => clearTimeout(autoCloseTimer);
  }, [dispatch, toastMessage.open]);

  const handleClose = () => {
    dispatch(closeToast());
  };

  if (!toastMessage.open || !toastMessage.message) {
    return null;
  }

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{
          vertical: toastMessage.vertical,
          horizontal: toastMessage.horizontal,
        }}
        open={toastMessage.open}
        onClose={handleClose}
        key={toastMessage.vertical + toastMessage.horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={toastMessage.severity}
          sx={{ width: "100%" }}
        >
          {toastMessage.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
