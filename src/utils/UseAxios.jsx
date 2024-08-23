import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = "http://localhost:8000/";

let isRefreshing = false;
let refreshSubscribers = [];

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`,
        }
    });

    const subscribeTokenRefresh = (callback, req) => {
        console.log("Added subscriber", callback, req);
        refreshSubscribers.push(callback);
    };

    const onRefreshed = (newAccessToken) => {
        console.log("just refreshed token, updating", refreshSubscribers, newAccessToken);
        refreshSubscribers.map(callback => callback(newAccessToken));
        refreshSubscribers = [];
    };

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).isBefore(dayjs());
        // console.log("intercepter", user, isExpired, isRefreshing, refreshSubscribers, req);
        if (!isExpired) return req;

        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const response = await axios.post(`${baseURL}api/token/refresh/`, {
                    refresh: authTokens.refresh
                });

                const newAuthTokens = response.data;
                localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
                setAuthTokens(newAuthTokens);
                setUser(jwtDecode(newAuthTokens.access));
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAuthTokens.access}`;

                onRefreshed(newAuthTokens.access);
            } catch (error) {
                console.log("error while refereshing tokens", error);
                // Handle error, possibly logging out the user
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return new Promise((resolve) => {
            subscribeTokenRefresh((newAccessToken) => {
                req.headers['Authorization'] = `Bearer ${newAccessToken}`;
                resolve(req);
            }, req);
        });
    });

    return axiosInstance;
};

export default useAxios;
