// src/models/session.model.js

import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        jti:{ type:String,required:true },
        refreshToken: {type: String, required: true,select: false, },
        browser: { type: String, default: null, },
        operatingSystem: { type: String,default: null,},
        platform: { type: String,default: null,},
        userAgent: {type: String, required: true, },
        ipAddress: { type: String, required: true, },
        loginAt: {type: Date, default: Date.now, },
        lastActivityAt: { type: Date, default: Date.now, },
        expiresAt: { type: Date, required: true, index: true, },
        revokedAt: { type: Date,  default: null, },
        revokeReason: {  type: String, default: null, },
    },
    { timestamps: true, versionKey: false }
);
sessionSchema.index({

    userId: 1,

    revokedAt: 1,

});

sessionSchema.index({

    expiresAt: 1

},
    {

        expireAfterSeconds: 0

    });

export const SessionModel =

    mongoose.models.Session ||

    mongoose.model(

        "Session",

        sessionSchema

    );