import { Injectable } from '@nestjs/common';
import { HistoryRepository } from '../../infrastructure/repositories/history.repository';

@Injectable()
export class EventHistoryUseCase {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async create(event: any): Promise<any> {
    await this.historyRepository.create(event);
    return { message: 'Event created' };
  }
}
