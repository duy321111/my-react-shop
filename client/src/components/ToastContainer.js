import React, { useEffect, useState } from "react";
import { notificationService } from "../services/notificationService";

const TOAST_META = {
    success: {
        title: "Success",
        iconClass: "fa-regular fa-circle-check",
    },
    info: {
        title: "Info",
        iconClass: "fa-solid fa-circle-info",
    },
    warning: {
        title: "Warning",
        iconClass: "fa-regular fa-circle-exclamation",
    },
    error: {
        title: "Error",
        iconClass: "fa-regular fa-circle-xmark",
    },
};

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    const removeToast = (toastId) => {
        setToasts((prev) => prev.filter((item) => item.id !== toastId));
    };

    useEffect(() => {
        const unsubscribe = notificationService.subscribe((toast) => {
            setToasts((prev) => [...prev, toast]);

            setTimeout(() => {
                removeToast(toast.id);
            }, toast.duration);
        });

        return unsubscribe;
        // subscribe once for global notifications
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="toast-container" aria-live="polite" aria-atomic="true">
            {toasts.map((toast) => {
                const meta = TOAST_META[toast.type] || TOAST_META.info;

                return (
                    <div
                        key={toast.id}
                        className={`toast toast--${toast.type}`}
                        style={{ "--toast-duration": `${toast.duration}ms` }}
                    >
                        <div className="toast__icon" aria-hidden="true">
                            <i className={meta.iconClass}></i>
                        </div>

                        <div className="toast__body">
                            <p className="toast__title">{meta.title}</p>
                            <p className="toast__message">{toast.message}</p>
                        </div>

                        <button
                            type="button"
                            className="toast__close"
                            aria-label="Close notification"
                            onClick={() => removeToast(toast.id)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <span
                            className="toast__progress"
                            aria-hidden="true"
                        ></span>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastContainer;
