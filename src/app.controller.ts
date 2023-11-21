import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Aggregation')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aggregate')
  @ApiQuery({
    name: 'city',
    required: false,
    type: String,
    description:
      'City name to filter the aggregation by. If not provided, aggregates data for all cities.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response with aggregated data',
    schema: {
      example: {
        citiesPopulation: [{ city: 'Dnipro', count: 42223 }],
        cityMembers: [
          {
            city: 'Dnipro',
            members: [{ first_name: 'Alex', count: 4352 }],
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No data found for the specified city',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAggregatedData(@Query('city') city?: string) {
    return await this.appService.getAggregatedData(city);
  }
}
