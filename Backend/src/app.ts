require("dotenv").config(); // Load .env file to process .env
import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import sanitize from "./4-middleware/sanitize";
import verbose from "./4-middleware/verbose";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller";
import vacationsController from "./6-controllers/vacations-controller";

const server = express();

// Defend from DOS attack (by limiting requests):
server.use(expressRateLimit({
    windowMs: 1000, // Time window (ms).
    max: 25 // Total requests allowed on that time.
}));

server.use(cors());
server.use(express.json());
server.use(expressFileUpload()); // Support file upload.
server.use(verbose); // Log user activities (to a file).
server.use(sanitize); // Strip tags from user input.
server.use('/api/vacations', express.static('1-assets/images'));
server.use("/api", authController);
server.use("/api", vacationsController);
server.use("/api", followersController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

export default {
    server
};
