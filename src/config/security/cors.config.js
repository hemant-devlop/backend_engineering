export const corsConfig = {
    origin: [
        "http://localhost:3000",
        "https://myapp.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: [],
    maxAge: 86400
};