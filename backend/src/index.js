import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import otpRoutes from "./routes/otp.js";
import panRoutes from "./routes/pan.js";
import pinRoutes from "./routes/pin.js";
import healthRoutes from "./routes/health.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/pan", panRoutes);
app.use("/api/pin", pinRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
