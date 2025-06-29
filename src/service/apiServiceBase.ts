import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseApi = createApi({
    reducerPath: "baseApiReducerPath",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.47:9000/',
        prepareHeaders: async (headers) => {
            const skipAuth = headers.get('skipAuth');
            if (!skipAuth) {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
            }
            headers.delete("skipAuth")
            return headers;
        },
    }),
    endpoints: () => ({}),
})