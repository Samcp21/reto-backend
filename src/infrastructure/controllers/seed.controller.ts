import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from 'src/application/services';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: 'Seed the database with initial data' })
  @ApiResponse({ status: 200, description: 'Data seeded successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async seedData() {
    return this.seedService.seedData();
  }
}
