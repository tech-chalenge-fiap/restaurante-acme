export const env = {
  isProduction: false,//process.env.TS_NODE_DEV === undefined,
  port: process.env.PORT ?? 4000,
  apiAccessKey: process.env.API_ACCESS_KEY,
  checkIpAuthorization: (/true/).test(process.env.CHECK_IP_AUTHORIZATION ?? 'false'),
  whitelistIps: process.env.WHITE_LIST_IPS,
  database: {
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USERNAME || '',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || '',
    }
  }
}

