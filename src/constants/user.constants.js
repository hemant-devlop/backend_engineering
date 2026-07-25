
export const USER_ROLE = Object.freeze({

    USER: "USER",

    ADMIN: "ADMIN",

    SUPER_ADMIN: "SUPER_ADMIN",

});

export const USER_STATUS = Object.freeze({

    ACTIVE: "ACTIVE",

    PENDING: "PENDING",

    LOCKED: "LOCKED",

    SUSPENDED: "SUSPENDED",

    DELETED: "DELETED",

});

export const AUTH_PROVIDER = Object.freeze({

    LOCAL: "LOCAL",

    GOOGLE: "GOOGLE",

    GITHUB: "GITHUB",

});

export const SessionRevocationReason = Object.freeze({

    USER_LOGOUT: "USER_LOGOUT",

    LOGOUT_ALL: "LOGOUT_ALL",

    PASSWORD_CHANGED: "PASSWORD_CHANGED",

    ACCOUNT_DISABLED: "ACCOUNT_DISABLED",

    TOKEN_REUSE: "TOKEN_REUSE",

    ADMIN_FORCED: "ADMIN_FORCED",

});