import { Router } from "express";
import authRoutes from '../routes/auth.route.js'
const router=Router()

router.use(authRoutes)

export default router;