import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {ErrorCodeGroups, SharedMessages} from "../exception/errorCodes";
import {Share} from "react-native";
import React, {useEffect} from "react";
import Toast from "react-native-toast-message";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
    error: unknown,
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}

export const showErrorToast = (error: any) => {
    console.log("errorToast#original: " + JSON.stringify(error))
    let errorMessage
    if (isFetchBaseQueryError(error)) {
        const data: any = error.data
        console.log("fetchBaseQueryError", data)
        errorMessage = ErrorCodeGroups[data?.errorCode] || SharedMessages.generic
    } else {
        errorMessage = SharedMessages.generic
    }


    console.log("showing toast: ", errorMessage)
    showToastMessage(errorMessage)
}

export const showToastMessage = (message: string) => {
    Toast.show({
        type: 'error',
        text1: message,
        position: 'top',
        visibilityTime: 3000,
    });
}