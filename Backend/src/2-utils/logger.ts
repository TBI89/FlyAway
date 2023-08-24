import path from "path";
import fs from "fs";

// Define path were the errors/activities will be saved in:
const errorLogFile = path.join(__dirname, "../logs/errors.log");
const activityLogFile = path.join(__dirname, "../logs/activities.log");

// Log new error with a time stamp:
function logError(message: string, err?: any): void {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    if (typeof err === "string") msgToLog += err + "\n";
    msgToLog += "-----------------------------------------";
    fs.appendFile(errorLogFile, msgToLog, () => { });
}

// Log new activity with a time stamp:
function logActivity(message: string): void {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    msgToLog += "-----------------------------------------";
    fs.appendFile(activityLogFile, msgToLog, () => { });
}

export default {
    logError,
    logActivity
};