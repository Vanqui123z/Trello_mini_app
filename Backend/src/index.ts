import express from "express";
import db from "./config/firebaseConfig";
import router from "./routers/index";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

db
app.use(router)
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
