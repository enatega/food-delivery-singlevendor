import React, { createContext, useCallback, useState } from "react";
import AlertSnack from "../components/Alert/AlertSnack";

export const AlertContext = createContext({
  closeAlert: () => null,
  showAlert: () => null,
});

const INITIAL_VALUE = {
  alive: null,
  cancelBtn: "",
  alertMessage: "",
  alertVisible: false,
  alertSeverity: "",
  closeAlert: () => null,
};

function AlertProvider({ children }) {
  const [snackShow, setSnackShow] = useState(INITIAL_VALUE);

  const closeAlert = useCallback(() => {
    setSnackShow(INITIAL_VALUE);
  }, []);

  const showAlert = useCallback(
    (showObj) => {
      setSnackShow((prev) => ({
        ...prev,
        alertVisible: true,
        closeAlert: closeAlert,
        ...showObj,
      }));
    },
    [closeAlert]
  );

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      <AlertSnack {...snackShow} />
      {children}
    </AlertContext.Provider>
  );
}

export default React.memo(AlertProvider);
