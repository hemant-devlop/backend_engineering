// validators/auth/login.validator.js

import { z } from "zod";

export const loginSchema = z.object({

    email: z
        .email()
        .trim()
        .toLowerCase().trim(),

    password: z
        .string()
        .min(1).trim(),

}).strict();