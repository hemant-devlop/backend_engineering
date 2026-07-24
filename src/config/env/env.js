import dotenv from 'dotenv'
import { envSchema } from './env.schema.js'

dotenv.config();

const parsedEnv=envSchema.safeParse(process.env)
if(!parsedEnv.success){
    console.error("❌ Environment validation failed.\n")

    console.error(
        parsedEnv.error.format()
    )

    process.exit(1)
}

const env=Object.freeze(parsedEnv.data)

export default env;