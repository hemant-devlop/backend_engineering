import express from "express";
import cookieParser from "cookie-parser";
import { database } from "./lib/database/index.js";
import authRoutes from './routes/auth.route.js'
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.use('/api/v1/',authRoutes)
app.use(errorMiddleware)

async function startServer() {

    try {
        await database.initialize();

        app.listen(5000, () => {
            console.log("Server Started 5000");
        });

    }
    catch (error) {

        console.error(error);

        process.exit(1);

    }

}

startServer();