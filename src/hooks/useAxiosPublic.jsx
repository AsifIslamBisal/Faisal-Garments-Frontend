import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://product-hunt-server-blue.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;