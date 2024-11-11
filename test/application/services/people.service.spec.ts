import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from '../../../src/application/services/people.service';
import { PeopleUseCase } from '../../../src/application/use-cases/peopleUseCase';
import {
  Person,
  UpdatePerson,
} from '../../../src/domain/models/person.interface';

describe('PeopleService', () => {
  let service: PeopleService;
  let useCase: PeopleUseCase;

  const mockPerson: Person = {
    id: '123',
    nombre: 'Juan Pérez',
    altura: '180',
    masa: '75',
    color_cabello: 'negro',
    color_piel: 'moreno',
    color_ojos: 'marrón',
    annio_nacimiento: '1990',
    genero: 'masculino',
    mundo_natal: 'Tierra',
    peliculas: [],
    especies: [],
    vehiculos: [],
    naves_estelares: [],
    creado: '2022-01-01T10:00:00.000Z',
    editado: '2022-01-02T12:00:00.000Z',
    url: 'https://fakeapi.com/api/people/123/',
  };

  const mockUpdatePerson: UpdatePerson = {
    nombre: 'Juan Actualizado',
    altura: '185',
  };

  const mockPeopleUseCase = {
    create: jest.fn().mockResolvedValue(mockPerson),
    findById: jest.fn().mockResolvedValue(mockPerson),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: PeopleUseCase,
          useValue: mockPeopleUseCase,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    useCase = module.get<PeopleUseCase>(PeopleUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una persona', async () => {
    const result = await service.createPerson(mockPerson);
    expect(result).toEqual(mockPerson);
    expect(useCase.create).toHaveBeenCalledWith(mockPerson);
  });

  it('debería obtener una persona por ID', async () => {
    const result = await service.getPersonById('123');
    expect(result).toEqual(mockPerson);
    expect(useCase.findById).toHaveBeenCalledWith('123');
  });

  it('debería actualizar una persona', async () => {
    await service.updatePerson('123', mockUpdatePerson);
    expect(useCase.update).toHaveBeenCalledWith('123', mockUpdatePerson);
  });

  it('debería eliminar una persona por ID', async () => {
    await service.deletePerson('123');
    expect(useCase.delete).toHaveBeenCalledWith('123');
  });
});
