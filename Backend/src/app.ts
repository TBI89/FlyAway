require("dotenv").config(); // Load .env file to process .env
import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import vacationsController from "./6-controllers/vacations-controller";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import sanitize from "./4-middleware/sanitize";
import authController from "./6-controllers/auth-controller";
import verbose from "./4-middleware/verbose";

const server = express();

server.use(cors());
server.use(express.json());
server.use(sanitize); // Strip tags from user input.
server.use(expressFileUpload()); // Support file upload.
server.use(verbose); // Log user activities (to a file).
server.use("/api", authController);
server.use("/api", vacationsController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

export default {
    server
};
