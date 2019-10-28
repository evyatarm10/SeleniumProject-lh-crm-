const winston = require('winston')

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: './logs/logger.log',
            level: 'silly'
        })
    ]
}

// Create the logger
const logger = winston.createLogger(logConfiguration)

