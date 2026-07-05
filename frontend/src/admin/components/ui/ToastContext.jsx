import {
  createContext,
  useContext,
  useState,
} from "react";

import Toast from "./Toast";

const ToastContext =
  createContext();

export function ToastProvider({
  children,
}) {
  const [toast, setToast] =
    useState({
      open: false,
      message: "",
      type: "success",
    });

  const showToast = ({
    message,
    type = "success",
  }) => {
    setToast({
      open: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((previous) => ({
        ...previous,
        open: false,
      }));
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >
      {children}

      <Toast {...toast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(
    ToastContext
  );
}