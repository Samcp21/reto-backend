import { Injectable } from '@nestjs/common';
import { PeopleUseCase } from '../use-cases/peopleUseCase';

@Injectable()
export class SeedService {
  constructor(private readonly peopleUseCase: PeopleUseCase) {}

  async seedData() {
    return this.peopleUseCase.seedData();
  }
}
