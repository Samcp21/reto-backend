import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

export class EventBridgeHelper {
  private readonly eventBridgeClient: EventBridgeClient;
  private readonly eventBusName: string;

  constructor(eventBusName: string) {
    this.eventBridgeClient = new EventBridgeClient({
      region: process.env.AWS_REGION,
    });
    this.eventBusName = eventBusName;
    console.log('Event Bus Name:', this.eventBusName);
  }

  async emitHistoryEvent(requestType: string): Promise<void> {
    try {
      const eventParams = {
        Entries: [
          {
            EventBusName: this.eventBusName,
            Source: 'reto-backend',
            DetailType: 'request.history',
            Detail: JSON.stringify({
              requestType,
              createdAt: new Date().toISOString(),
            }),
          },
        ],
      };
      console.log('eventParams', eventParams);
      await this.eventBridgeClient.send(new PutEventsCommand(eventParams));
      console.log('History event emitted');
    } catch (error) {
      console.error('Error emitting history event', error);
    }
  }
}
