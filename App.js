import "dotenv/config";
import Hello from "./Hello.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import ChatRoutes from "./OpenAI/routes.js";
mongoose.connect("mongodb://127.0.0.1:27017/senzu");
const app = express();
app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(express.json());
app.use(
    session(sessionOptions)
);
Hello(app);
ChatRoutes(app);
app.listen(process.env.PORT || 4000);

