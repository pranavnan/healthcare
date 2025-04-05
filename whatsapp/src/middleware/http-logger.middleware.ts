import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

/**
 * Middleware for logging HTTP requests
 */
export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  // Get request start time
  const startTime = new Date().getTime();
  
  // Log request details
  Logger.http(`${req.method} ${req.url} - Request started`);
  
  // Once the response is finished
  res.on('finish', () => {
    // Calculate request processing time
    const responseTime = new Date().getTime() - startTime;
    
    // Log response details
    const logMessage = `${req.method} ${req.url} - Response: ${res.statusCode} - ${responseTime}ms`;
    
    if (res.statusCode >= 400) {
      Logger.error(logMessage);
    } else if (res.statusCode >= 300) {
      Logger.warn(logMessage);
    } else {
      Logger.http(logMessage);
    }
  });
  
  next();
}; 