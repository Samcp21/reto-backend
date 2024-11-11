import { Injectable } from '@nestjs/common';
import { EventHistoryUseCase } from 'src/application/use-cases/eventHistoryUseCase';

@Injectable()
export class HistoryEventService {
  constructor(private readonly eventHistoryUseCase: EventHistoryUseCase) {}
  async createHistory(event): Promise<boolean> {
    await this.eventHistoryUseCase.create(event);
    return true;
  }
}
