import Logger from './logger';

/**
 * Log utility functions
 */
export class LogUtil {
  /**
   * Log an object with a custom message at info level
   * @param object Object to log
   * @param message Optional message to prepend
   */
  static logObject(object: any, message?: string): void {
    try {
      const formattedMessage = message 
        ? `${message}: ${JSON.stringify(object, null, 2)}`
        : JSON.stringify(object, null, 2);
      
      Logger.info(formattedMessage);
    } catch (error) {
      Logger.error(`Error logging object: ${error}`);
    }
  }

  /**
   * Log an error with details
   * @param error Error object
   * @param context Additional context information
   * @param message Optional message to prepend
   */
  static logError(error: any, context?: any, message?: string): void {
    try {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      const formattedMessage = message
        ? `${message}: ${errorMessage}`
        : errorMessage;
      
      Logger.error(formattedMessage, {
        stack: errorStack,
        context: context ? JSON.stringify(context) : undefined
      });
    } catch (err) {
      Logger.error(`Error logging error: ${err}`);
    }
  }

  /**
   * Log a debug message with optional data
   * @param message Debug message
   * @param data Optional data to include
   */
  static debug(message: string, data?: any): void {
    try {
      const logMessage = data
        ? `${message}: ${JSON.stringify(data, null, 2)}`
        : message;
      
      Logger.debug(logMessage);
    } catch (error) {
      Logger.error(`Error logging debug message: ${error}`);
    }
  }
} 