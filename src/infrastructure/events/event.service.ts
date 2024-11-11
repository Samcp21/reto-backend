import { Injectable, Logger } from '@nestjs/common';
import { HistoryEventService } from './historyEvent.service';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(private historyEventService: HistoryEventService) {}
  public async process(event: any): Promise<void> {
    console.log('Event received:', event);
    switch (event['detail-type']) {
      case 'request.history':
        this.logger.log('Request created event received');
        await this.historyEventService.createHistory(event.detail);
      default:
        this.logger.warn('Unknown event type');
        break;
    }
  }
}
