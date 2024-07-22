import winston, { format, transports } from 'winston';
import { env } from '@/main/config/env'

class Logger {
  private logger: winston.Logger;

  constructor(productionMode: boolean) {
    this.logger = winston.createLogger({
      level: productionMode ? 'info' : 'debug',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple()
          ),
        }),
      ],
    });
  }

  public log(message: string): void {
    this.logger.log('info', message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public success(message: string): void {
    this.logger.log('info', `\x1b[32m${message}\x1b[0m`); // Green color
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}
 
export const logger =  new Logger(env.isProduction)

