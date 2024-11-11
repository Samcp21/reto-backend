import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PeopleService } from '../../application/services/people.service';
import { CreatePersonDto } from 'src/application/dtos/create-person.dto';
import { UpdatePersonDto } from 'src/application/dtos/update-person.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiOperation({ summary: 'Crear una nueva persona' })
  @ApiResponse({ status: 201, description: 'Persona creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno' })
  @Post()
  async createPerson(@Body() person: CreatePersonDto) {
    return this.peopleService.createPerson(person);
  }

  @ApiOperation({ summary: 'Obtener persona por ID' })
  @ApiResponse({ status: 200, description: 'Persona encontrada' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  @Get(':id')
  async getPerson(@Param('id') id: string) {
    return this.peopleService.getPersonById(id);
  }

  @ApiOperation({ summary: 'Obtener todas las personas con paginación' })
  @ApiResponse({ status: 200, description: 'Personas encontradas' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @Get()
  async getPersons(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.peopleService.getPersonsPaginated(page, limit);
  }

  @ApiOperation({ summary: 'Actualizar información de una persona' })
  @ApiResponse({ status: 200, description: 'Persona actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  @Put(':id')
  async updatePerson(
    @Param('id') id: string,
    @Body() updates: UpdatePersonDto,
  ) {
    return this.peopleService.updatePerson(id, updates);
  }

  @ApiOperation({ summary: 'Eliminar una persona por ID' })
  @ApiResponse({ status: 200, description: 'Persona eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  @Delete(':id')
  async deletePerson(@Param('id') id: string) {
    return this.peopleService.deletePerson(id);
  }
}
