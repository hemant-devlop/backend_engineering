import crypto from 'crypto'

export const requestIdMiddleware=(req,res,next)=>{
    req.id=crypto.randomUUID();

    res.setHeader('x-Request-Id',req.id)

    next()
}