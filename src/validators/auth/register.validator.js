// src/validators/auth/register.validator.js

import { z } from "zod";

export const registerSchema = z
    .object({

        firstName: z
            .string()
            .trim()
            .min(2)
            .max(50),

        lastName: z
            .string()
            .trim()
            .min(2)
            .max(50),

        email: z
            .email()
            .toLowerCase().trim(),

        password: z
            .string()
            .min(8)
            .max(128).trim(),

        confirmPassword: z
            .string().trim(),

    }).refine((data)=>data.password===data.confirmPassword,{
        message:"Password do not match",
        path:["confirmPassword"],
    }).strict();