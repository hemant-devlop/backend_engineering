import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";
import { registerSchema } from "../validators/auth/register.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import { loginSchema } from "../validators/auth/login.validator.js";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/author.middleware.js";
import { USER_ROLE } from "../constants/user.constants.js";
const router = Router();

router.post("/register",validate({body:registerSchema}),asyncHandler(authController.register));

router.post("/login",validate({body:loginSchema}),asyncHandler(authController.login));

router.post("/refresh",protect,asyncHandler(authController.refresh));//not done
router.get("/user",protect,authorize(USER_ROLE.USER,USER_ROLE.ADMIN),asyncHandler(authController.user));//not done

// router.post("/logout",authenticationMiddleware,authController.logout);

// router.post("/logout-all",authenticationMiddleware,authController.logoutAll);

// router.get("/me",authenticationMiddleware,authController.me);

export default router;