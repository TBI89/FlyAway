import { Request, Response, NextFunction } from "express";
import logger from "../2-utils/logger";

function verbose(request: Request, response: Response, next: NextFunction): void {

    const activityMessage = `
         User IP: ${request.ip}
         Method: ${request.method}
         Url: ${request.originalUrl} 
         Body: ${JSON.stringify(request.body)}`

    // Log activities to activities.log file:
    logger.logActivity(activityMessage);

    next();
}

export default verbose;