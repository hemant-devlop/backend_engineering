import {z} from 'zod';

export const envSchema=z.object({
    // application

    APP_NAME:z.string().trim().min(1),
    NODE_ENV:z.enum([
        "development",
        "production",
        "test",
    ]),
    PORT:z.coerce.number().int().min(1).max(65535),
    CLIENT_URL:z.url(),

    //DATABASE
    DB_URI:z.string().trim().min(1),
    DB_NAME:z.string().trim().min(1),
    DB_RETRY_LIMIT:z.coerce.number().int().min(1),
    DB_RETRY_DELAY:z.coerce.number().int().min(1000),

    //AUTHENTICATION
    JWT_ACCESS_TOKEN:z.string().min(32),
    JWT_REFRESH_TOKEN:z.string().min(32),

    JWT_ACCESS_EXPIRES:z.string(),
    JWT_REFRESH_EXPIRES:z.string(),

    //cookie
    COOKIE_ACCESS_NAME: z.string(),

  COOKIE_REFRESH_NAME: z.string(),
  
  COOKIE_SECURE: z.coerce.boolean(),
  
  COOKIE_HTTP_ONLY: z.coerce.boolean(),
  
  COOKIE_SAME_SITE: z.enum([
    "strict",
    "lax",
    "none",
  ]),

  //security
   BCRYPT_ROUNDS: z.coerce
    .number()
    .int()
    .min(10)
    .max(15),

    //loggger
     LOG_LEVEL: z.enum([
    "error",
    "warn",
    "info",
    "http",
    "verbose",
    "debug",
  ]),
})
