import { Module } from '@nestjs/common';
import { PeopleController, SeedController } from './infrastructure/controllers';
import { PeopleService, SeedService } from './application/services';
import { PeopleRepository } from './infrastructure/repositories/people.repository';
import { SwapiClient } from './infrastructure/clients/swapi.client';
import { PeopleUseCase } from './application/use-cases/peopleUseCase';
import { EventService } from './infrastructure/events/event.service';
import { HistoryEventService } from './infrastructure/events/historyEvent.service';
import { EventHistoryUseCase } from './application/use-cases/eventHistoryUseCase';
import { HistoryRepository } from './infrastructure/repositories/history.repository';

@Module({
  imports: [],
  controllers: [PeopleController, SeedController],
  providers: [
    PeopleService,
    PeopleRepository,
    PeopleUseCase,
    SeedService,
    EventService,
    HistoryEventService,
    EventHistoryUseCase,
    HistoryRepository,
    SwapiClient,
  ],
})
export class AppModule {}
