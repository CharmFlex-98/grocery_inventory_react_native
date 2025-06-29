export enum ErrorCode {
    // Generic
    GENERIC_ERROR = "GENERIC_ERROR",

    // Auth
    INVALID_TOKEN = "INVALID_TOKEN",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    MISSING_TOKEN = "MISSING_TOKEN",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    REGISTRATION_ERROR = "REGISTRATION_ERROR",
    USER_EXIST = "USER_EXIST",

    // Inventory
    DUPLICATED_GROCERY = "DUPLICATED_GROCERY",
    REMOVAL_FORBIDDEN = "REMOVAL_FORBIDDEN",
    ITEM_NOT_FOUND = "ITEM_NOT_FOUND",
    INVALID_OPERATION = "INVALID_OPERATION",

    FORM_NOT_COMPLETED = "FORM_NOT_COMPLETED"
}

// 1. Define reusable error messages
export const SharedMessages = {
    invalidSession: "Your session is invalid. Please login again.",
    userExists: "This user already exists.",
    registrationFailed: "Unable to register at the moment.",
    groceryExists: "You already have this grocery item.",
    itemNotFound: "The item you're looking for doesn't exist.",
    operationInvalid: "That operation is not allowed.",
    removalRestricted: "Error in removing item",
    generic: "Something went wrong. Please try again.",
    formNotCompleted: "Please double check all the inputs before confirming"
};


// 2. Group error codes by what they mean
export const ErrorCodeGroups: Record<string, string> = {
    // Auth errors
    [ErrorCode.INVALID_TOKEN]: SharedMessages.invalidSession,
    [ErrorCode.TOKEN_EXPIRED]: SharedMessages.invalidSession,
    [ErrorCode.MISSING_TOKEN]: SharedMessages.invalidSession,

    [ErrorCode.USER_NOT_FOUND]: SharedMessages.generic,
    [ErrorCode.USER_EXIST]: SharedMessages.userExists,
    [ErrorCode.REGISTRATION_ERROR]: SharedMessages.registrationFailed,

    // Inventory errors
    [ErrorCode.DUPLICATED_GROCERY]: SharedMessages.groceryExists,
    [ErrorCode.REMOVAL_FORBIDDEN]: SharedMessages.removalRestricted,
    [ErrorCode.ITEM_NOT_FOUND]: SharedMessages.itemNotFound,
    [ErrorCode.INVALID_OPERATION]: SharedMessages.operationInvalid,

    // Generic
    [ErrorCode.GENERIC_ERROR]: SharedMessages.generic,
    [ErrorCode.FORM_NOT_COMPLETED]: SharedMessages.formNotCompleted,
};