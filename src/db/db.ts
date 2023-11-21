import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as process from 'process';

@Injectable()
export class MysqlService {
  private connection;

  constructor() {
    this.init();
  }

  async init() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  async query(sql: string, params?: any[]) {
    const [results] = await this.connection.execute(sql, params);
    return results;
  }
}
