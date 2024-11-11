import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PeopleRepository } from 'src/infrastructure/repositories/people.repository';
import { SwapiClient } from 'src/infrastructure/clients/swapi.client';
import { Person } from 'src/domain/models/person.interface';

@Injectable()
export class PeopleUseCase {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly swapiClient: SwapiClient,
  ) {}
  async create(person: Person): Promise<Person> {
    const id = uuidv4();
    const personWithId = { id, ...person };
    await this.peopleRepository.create(personWithId);
    return personWithId as Person;
  }

  async findById(id: string): Promise<Person | null> {
    let person = await this.peopleRepository.findById(id);
    if (person) {
      return person as Person;
    }

    person = await this.swapiClient.getCharacter(Number(id));

    if (person) {
      await this.peopleRepository.create({
        id,
        ...person,
      });
      return person as Person;
    }

    return null;
  }
  async findPersonsPaginated(page: number, limit: number) {
    return await this.peopleRepository.findPersonsPaginated(page, limit);
  }

  async update(id: string, updates: any): Promise<{ message: string }> {
    return await this.peopleRepository.update(id, updates).then(() => {
      return { message: 'Person updated successfully' };
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    return await this.peopleRepository.delete(id).then(() => {
      return { message: 'Person deleted successfully' };
    });
  }

  async seedData(): Promise<{ message: string }> {
    const characters = await this.swapiClient.getCharacters();
    const promises = characters.map(async (character) => {
      const id = character.url.split('/').reverse()[1];
      return this.peopleRepository.create({ id, ...character });
    });
    return Promise.all(promises).then(() => {
      return { message: 'Data seeded successfully' };
    });
  }
}
