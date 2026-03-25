const listeners = new Set();

const notify = (type, message, duration = 2500) => {
    const payload = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        message,
        duration,
    };

    listeners.forEach((listener) => listener(payload));
};

export const notificationService = {
    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    success(message, duration) {
        notify("success", message, duration);
    },
    error(message, duration) {
        notify("error", message, duration);
    },
    info(message, duration) {
        notify("info", message, duration);
    },
    warning(message, duration) {
        notify("warning", message, duration);
    },
};
