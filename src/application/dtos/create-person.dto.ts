import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ description: 'Nombre de la persona' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Altura de la persona' })
  @IsString()
  altura: string;

  @ApiProperty({ description: 'Masa de la persona' })
  @IsString()
  masa: string;

  @ApiProperty({ description: 'Color de cabello de la persona' })
  @IsString()
  color_cabello: string;

  @ApiProperty({description:'Color de piel'})
  @IsString()
  color_piel: string;

  @ApiProperty({ description: 'Color de ojos de la persona' })
  @IsString()
  color_ojos: string;

  @ApiProperty({ description: 'Año de nacimiento de la persona' })
  @IsString()
  annio_nacimiento: string;

  @ApiProperty({ description: 'Genero de la persona' })
  @IsString()
  genero: string;

  @ApiProperty({ description: 'Nombre del planeta natal de la persona' })
  @IsString()
  mundo_natal: string;


  @ApiProperty({ description: 'Películas en las que aparece la persona' })
  @IsArray()
  @IsString({ each: true })
  peliculas: string[];

  @ApiProperty({ description: 'Especies a las que pertenece la persona' })
  @IsArray()
  @IsString({ each: true })
  especies: string[];

  @ApiProperty({ description: 'Vehículos que posee la persona' })
  @IsArray()
  @IsString({ each: true })
  vehiculos: string[];

  @ApiProperty({ description: 'Naves estelares que posee la persona' })
  @IsArray()
  @IsString({ each: true })
  naves_estelares: string[];

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @IsString()
  creado: string;

  @ApiProperty({ description: 'Fecha de última edición del registro' })
  @IsString()
  editado: string;

  @ApiProperty({ description: 'URL del registro' })
  @IsString()
  url: string;
}
