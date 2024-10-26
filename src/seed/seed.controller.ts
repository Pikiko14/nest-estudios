import { SeedService } from './seed.service';
import { Controller, Get } from '@nestjs/common';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  populateBd() {
    return this.seedService.executeSeed();
  }
}
