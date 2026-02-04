"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ErrorModalContextType {
  showError: (errorCode: string) => void;
  hideError: () => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(
  undefined,
);

export function useErrorModal() {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error("useErrorModal must be used within an ErrorModalProvider");
  }
  return context;
}

const errorTypes: Record<string, string> = {
  "Network Error":
    "There was a problem connecting to the server. Please check your internet connection and try again.",
  "404":
    "The requested resource was not found. Please check the URL and try again.",
  "500": "An internal server error occurred. Please try again later.",
  "403": "You do not have permission to access this resource.",
  "401":
    "Your session has expired or you are not authorized to access this resource. Please log in and try again.",
  "400": "Bad request. Please check the data you have provided and try again.",
  default: "An unexpected error occurred. Please try again later.",
};

export function ErrorModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorCode, setErrorCode] = useState<string>("");

  const showError = (code: string) => {
    setErrorCode(code);
    setIsOpen(true);
  };

  const hideError = () => {
    setIsOpen(false);
    setErrorCode("");
  };

  return (
    <ErrorModalContext.Provider value={{ showError, hideError }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={hideError}
        >
          <div
            className="relative w-full max-w-md mx-4 p-6 bg-white dark:bg-cafe rounded-2xl shadow-2xl border border-red-200 dark:border-red-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={hideError}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-red-600 dark:text-red-400 mb-2">
              Error{" "}
              {errorCode !== "Network Error" && errorCode !== "default"
                ? errorCode
                : ""}
            </h2>

            {/* Message */}
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
              {errorTypes[errorCode] || errorTypes.default}
            </p>

            {/* Close Button */}
            <button
              onClick={hideError}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ErrorModalContext.Provider>
  );
}
