import toast, { ToastOptions } from "react-hot-toast";

const baseStyle = {
  background: "#333",
  color: "#fff",
  borderRadius: "8px",
  padding: "12px 16px",
  fontSize: "14px",
};

const baseOptions: ToastOptions = {
  position: "top-right",
  style: baseStyle,
};

export const showSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, {
    ...baseOptions,
    iconTheme: { primary: "#00A651", secondary: "#fff" },
    ...options,
  });

export const showError = (message: string, options?: ToastOptions) =>
  toast.error(message, {
    ...baseOptions,
    iconTheme: { primary: "#FF3B30", secondary: "#fff" },
    ...options,
  });

export const showInfo = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...baseOptions,
    icon: "ℹ️",
    style: { ...baseStyle, background: "#2563eb" },
    ...options,
  });

export const showWarning = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...baseOptions,
    icon: "⚠️",
    style: { ...baseStyle, background: "#f59e0b" },
    ...options,
  });
