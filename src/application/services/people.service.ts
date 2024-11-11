import { Injectable } from '@nestjs/common';
import { PeopleUseCase } from '../use-cases/peopleUseCase';
import { Person, UpdatePerson } from 'src/domain/models/person.interface';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleUseCase: PeopleUseCase) {}

  async createPerson(person: Person): Promise<Person> {
    return this.peopleUseCase.create(person);
  }

  async getPersonById(id: string) {
    return this.peopleUseCase.findById(id);
  }

  async getPersonsPaginated(page: number, limit: number) {
    return this.peopleUseCase.findPersonsPaginated(page, limit);
  }

  async updatePerson(
    id: string,
    updates: UpdatePerson,
  ): Promise<{ message: string }> {
    return this.peopleUseCase.update(id, updates);
  }

  async deletePerson(id: string): Promise<{ message: string }> {
    return this.peopleUseCase.delete(id);
  }
}
