import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
