import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

let refreshPromise = null;

async function tryRefresh() {
    if (!refreshPromise) {
        refreshPromise = axios
            .post("/api/auth/refresh", null, { withCredentials: true })
            .then(() => true)
            .catch(() => {
                window.dispatchEvent(new CustomEvent("auth:session-expired"));
                return false;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
}

axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status;
        const config = error.config;

        if (status === 401 && config && !config._retried) {
            config._retried = true;
            const ok = await tryRefresh();
            if (ok) return axiosSecure(config);
        }

        if (status === 403) {
            window.dispatchEvent(new CustomEvent("auth:session-expired"));
        }

        return Promise.reject(error);
    }
);

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
