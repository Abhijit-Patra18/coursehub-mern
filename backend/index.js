import express from "express";
const app = express();
app.use(express.json());
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import purchaseRoutes from "./routes/purchaseRoutes.js"
import dotenv from "dotenv";
dotenv.config();


main()
    .then(() => {
        console.log("✅connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}


app.use("/api", courseRoutes);
app.use("/api", userRoutes);
app.use("/api", purchaseRoutes);





app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        message: message
    });
});


app.listen(PORT, () => {
    console.log("✅Server running");
});