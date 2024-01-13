import './config/module-alias'
import { env } from '@/main/config/env'
import { MySQLConnection } from '@/infra/repos/mysql/helpers'
import { app } from '@/main/config/app'

import { logger } from '@/infra/helpers'

import 'reflect-metadata';

MySQLConnection.getInstance()
app.listen(env.port, () => logger.success(`Server running at http://localhost:${env.port}`))