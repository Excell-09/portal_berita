import Alert, { AlertColor } from "@mui/material/Alert";
import useAlert from "../atom/errorState";

export default function DisplayAlert() {
  const { alert, setAlert } = useAlert();
  const handleCloseAlert = () => setAlert({ message: null, status: null });

  const ALERTSTATUS = {
    error: "error" as AlertColor,
    success: "success" as AlertColor,
  };

  return (
    <>
      {alert.status !== null && alert.message !== null && (
        <Alert
          sx={{ my: 2 }}
          severity={ALERTSTATUS[alert.status]}
          onClose={handleCloseAlert}
        >
          {alert.message}
        </Alert>
      )}
    </>
  );
}
