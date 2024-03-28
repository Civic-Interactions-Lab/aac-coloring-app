const DEFAULT_URL = "http://localhost:8000";

export const getBackendUrl = () => {
    const mode = process.env.NEXT_PUBLIC_DEV_MODE;

    // mode unknown default to dev
    if (!mode) return DEFAULT_URL;

    if (mode.toLowerCase() === "dev") return process.env.NEXT_PUBLIC_DEV_BACKEND_URL ?? DEFAULT_URL;
    if (mode.toLowerCase() === "prod") return process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_URL;

    return DEFAULT_URL;
};
