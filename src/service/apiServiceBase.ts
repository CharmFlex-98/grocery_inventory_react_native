import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseApi = createApi({
    reducerPath: "baseApiReducerPath",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gimicro.charmflex.com/',
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