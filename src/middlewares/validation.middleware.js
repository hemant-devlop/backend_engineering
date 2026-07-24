import ApiError from "../errors/errorHelper.js";
import { formatZodErrors } from "../errors/zodErrorFormat.js";

export const validate = (schemas = {}) => {

    return (req, res, next) => {

        const validated = {};

        const errors = {};

        const targets = {

            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
            headers: req.headers,

        };

        for (const [key, schema] of Object.entries(schemas)) {
            if (!schema) continue;

            const result = schema.safeParse(targets[key]);

            if (!result.success) {
                 errors[key]=formatZodErrors(result.error)
                continue;

            }

            validated[key] = result.data;

        }

        if (Object.keys(errors).length > 0) {
            
            return next( res.status(400).json({
                success:false,
                message:'validation Error',
                data:errors.body
            }) );

        }

        req.validated = Object.freeze(validated);

        next();
        

    };

};