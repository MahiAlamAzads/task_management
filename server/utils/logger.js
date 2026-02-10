// Create: c:\Users\MAHI ALAM\project\task_management\server\utils\logger.js
const fs = require('fs');
const path = require('path');

function logError(error, route) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${route}: ${error.message}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs/errors.log'), logMessage);
}

module.exports = { logError };