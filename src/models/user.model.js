// src/modules/user/models/user.model.js

import mongoose from "mongoose";

import {

    USER_ROLE,

    USER_STATUS,

    AUTH_PROVIDER,

} from "../constants/user.constants.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        passwordHash: {
            type: String,
            required: true,
            select: false,
        },

        provider: {
            type: String,
            enum: Object.values(AUTH_PROVIDER),
            default: AUTH_PROVIDER.LOCAL,
        },

        role: {
            type: String,
            enum: Object.values(USER_ROLE),
            default: USER_ROLE.USER,
            index: true,
        },

        status: {
            type: String,
            enum: Object.values(USER_STATUS),
            default: USER_STATUS.PENDING,
            index: true,
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerifiedAt: {
            type: Date,
            default: null,
        },
        deletedAt: {
            type: Date,
            default: null,
        },

        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        avatar: {
            publicId: String,
            url: String,
        },

        passwordChangedAt: {
            type: Date,
            default: null,
        },

        failedLoginAttempts: {
            type: Number,
            default: 0,
        },

        lockUntil: {
            type: Date,
            default: null,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },
        lastSeenAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.index(
    { email: 1 },
    { unique: true }
);

userSchema.index({
    role: 1,
    status: 1,
});

export const UserModel =
    mongoose.models.User ||
    mongoose.model("User", userSchema);