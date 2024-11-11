import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryRepository {
  private readonly dynamoDb: DynamoDBDocumentClient;
  private readonly tableName: string;
  constructor() {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    this.dynamoDb = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.HISTORY_TABLE!;
  }

  async create(event: any): Promise<any> {
    try {
      const params = {
        TableName: this.tableName,
        Item: event,
      };
      await this.dynamoDb.send(new PutCommand(params));
    } catch (error) {
      console.error('Error creating event', error);
    }
  }
}
