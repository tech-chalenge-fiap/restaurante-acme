export const env = {
  port: process.env.PORT ?? 4000,
  apiAccessKey: process.env.API_ACCESS_KEY,
  database: {
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '4080') || 4080,
      username: process.env.MYSQL_USERNAME || '',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || '',
    }
  }
}
