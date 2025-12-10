import React, { useState, createContext, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
  });

  const showAlert = (message) => {
    setAlert({
      open: true,
      message,
    });
  };

  const handleClose = () => {
    setAlert({ open: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
