import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetch } from 'react-native-ssl-pinning';

type FetchArgs = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
};

export const sslPinnedBaseQuery: BaseQueryFn<FetchArgs, unknown, unknown> = async (
    args
) => {
    try {
        const res = await fetch(args.url, {
            method: args.method ?? 'GET',
            sslPinning: {
                certs: ['your_cert_filename_without_extension'],
            },
            headers: {
                'Content-Type': 'application/json',
                ...args.headers,
            },
            body: args.body ? JSON.stringify(args.body) : undefined,
        });

        const json = JSON.parse(res.bodyString ?? "");

        return { data: json };
    } catch (error: any) {
        return {
            error: {
                status: error.status || 500,
                data: error.message || 'SSL Pinning Error',
            },
        };
    }
};
