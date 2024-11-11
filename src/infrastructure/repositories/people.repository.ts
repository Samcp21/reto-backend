import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Person, UpdatePerson } from 'src/domain/models/person.interface';
import { EventBridgeHelper } from '../helpers/event-bridge.helper';

@Injectable()
export class PeopleRepository {
  private readonly dynamoDb: DynamoDBDocumentClient;
  private readonly tableName: string;
  private readonly eventBridgeHelper: EventBridgeHelper;

  constructor() {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION });
    this.dynamoDb = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.PEOPLE_TABLE!;
    this.eventBridgeHelper = new EventBridgeHelper(process.env.EVENT_BUS_NAME!);
  }

  async create(person: Person): Promise<void> {
    try {
      const params = {
        TableName: this.tableName,
        Item: person,
      };
      console.log('params', params);
      await this.dynamoDb.send(new PutCommand(params));

      await this.eventBridgeHelper.emitHistoryEvent('POST');
    } catch (error) {
      console.error('Error creating person', error);
    }
  }

  async findPersonsPaginated(
    page: number,
    limit: number,
  ): Promise<{ items: Person[]; currentPage: number; nextPage?: number }> {
    let exclusiveStartKey = undefined;

    if (page > 1) {
      exclusiveStartKey = { id: String(page) };
    }

    const params = {
      TableName: this.tableName,
      Limit: limit,
      ExclusiveStartKey: exclusiveStartKey,
    };

    try {
      const { Items, LastEvaluatedKey } = await this.dynamoDb.send(
        new ScanCommand(params),
      );
      await this.eventBridgeHelper.emitHistoryEvent('GET');

      return {
        items: Items as Person[],
        currentPage: page,
        nextPage: LastEvaluatedKey ? Number(page) + 1 : undefined,
      };
    } catch (error) {
      console.error('Error fetching paginated data', error);
      throw new Error('Could not fetch paginated data');
    }
  }

  async findById(id: string): Promise<Person | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const { Item } = await this.dynamoDb.send(new GetCommand(params));
    await this.eventBridgeHelper.emitHistoryEvent('GET');

    return (Item as Person) || null;
  }

  async update(id: string, updates: UpdatePerson): Promise<void> {
    const updateExpressions = Object.keys(updates)
      .map((key) => `#${key} = :${key}`)
      .join(', ');

    const expressionAttributeValues = Object.entries(updates).reduce(
      (acc, [key, value]) => ({ ...acc, [`:${key}`]: value }),
      {},
    );

    const expressionAttributeNames = Object.keys(updates).reduce(
      (acc, key) => ({ ...acc, [`#${key}`]: key }),
      {},
    );

    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `set ${updateExpressions}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
    };

    await this.dynamoDb.send(new UpdateCommand(params));
    await this.eventBridgeHelper.emitHistoryEvent('PUT');
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    await this.dynamoDb.send(new DeleteCommand(params));
    await this.eventBridgeHelper.emitHistoryEvent('DELETE');
  }
}
