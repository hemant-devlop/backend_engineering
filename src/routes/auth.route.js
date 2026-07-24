import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";
import { registerSchema } from "../validators/auth/register.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
const router = Router();

router.post("/register",validate({body:registerSchema}),asyncHandler(authController.register));

// router.post("/login",validate(loginSchema),authController.login);

// router.post("/refresh",authController.refresh);

// router.post("/logout",authenticationMiddleware,authController.logout);

// router.post("/logout-all",authenticationMiddleware,authController.logoutAll);

// router.get("/me",authenticationMiddleware,authController.me);

export default router;