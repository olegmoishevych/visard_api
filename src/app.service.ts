import { Injectable } from '@nestjs/common';
import { MysqlService } from './db/db';

@Injectable()
export class AppService {
  constructor(private mysqlService: MysqlService) {}

  async getAggregatedData(city?: string): Promise<any> {
    let whereClause = '';
    if (city) {
      whereClause = 'WHERE cities.name LIKE ?';
    }

    const citiesPopulationQuery = `
      SELECT cities.name as city, COUNT(residents.id) as count
      FROM residents
      JOIN cities ON residents.city_id = cities.id
      ${whereClause}
      GROUP BY cities.id
      ORDER BY count DESC;
    `;

    const cityMembersQuery = `
      SELECT cities.name as city, residents.first_name, COUNT(residents.id) as count
      FROM residents
      JOIN cities ON residents.city_id = cities.id
      ${whereClause}
      GROUP BY cities.id, residents.first_name
      ORDER BY cities.name, count DESC;
    `;

    const citiesPopulation = await this.mysqlService.query(
      citiesPopulationQuery,
      [city ? `%${city}%` : null],
    );
    const cityMembers = await this.mysqlService.query(cityMembersQuery, [
      city ? `%${city}%` : null,
    ]);

    return {
      citiesPopulation,
      cityMembers,
    };
  }
}
