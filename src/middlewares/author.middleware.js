import { USER_ROLE } from "../constants/user.constants.js";

const authorize = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (
            req.user.role !== USER_ROLE.ADMIN &&
            req.user._id.toString() !== req.params.id
        ) {
           return res.status(403).json({
                success: false,
                message: 'you are not authorize',
                error: null
            })
        }
        if (!roles.includes(user.role)) {//multiple permisions by given user specific permision in db 
            return res.status(403).json({
                success: false,
                message: 'you are not authorize',
                error: null
            })
        }
        next()
    }
}

export default authorize;