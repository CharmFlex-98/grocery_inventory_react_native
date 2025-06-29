import {baseApi} from "../../../service/apiServiceBase";
import * as url from "node:url";
import {BaseQueryError, BaseQueryMeta} from "@reduxjs/toolkit/query";

type AuthLoginRequest = {
    username: string;
    password: string;
};

type AuthLoginResponse = {
    success: boolean;
    token: string;
};

type AuthRegisterRequest = {
    username: string,
    password: string
}

export const createAuthLoginRequest = (password: string, name: string): AuthLoginRequest => {
    return {username: name, password} as AuthLoginRequest;
}

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<AuthLoginResponse, AuthLoginRequest>({
            query: (request) => ({
                url: 'api/v1/auth/login',
                method: "POST",
                body: request,
                headers: {
                    'Content-Type': 'application/json',
                    'skipAuth': 'true'
                },
                timeout: 10000
            }),
        }),
        signUpUser: build.mutation<{}, AuthRegisterRequest>({
            query: (request) => ({
                    url: 'api/v1/auth/register',
                    method: "POST",
                    body: request,
                    headers: {
                        'Content-Type': 'application/json',
                        'skipAuth': 'true'
                    },
                    timeout: 10000
                }
            )
        })
    }),
    overrideExisting: false,
})

export const {useLoginUserMutation, useSignUpUserMutation} = authApi;