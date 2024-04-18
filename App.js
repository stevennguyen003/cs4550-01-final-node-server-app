import Hello from "./Hello.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
Hello(app);
app.listen(4000);

