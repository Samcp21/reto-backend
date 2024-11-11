import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Nombre de la persona' })
  nombre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Altura de la persona' })
  altura?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Masa de la persona' })
  masa?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Color de cabello de la persona' })
  color_cabello?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Color de piel de la persona' })
  color_piel?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Color de ojos de la persona' })
  color_ojos?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Año de nacimiento de la persona' })
  annio_nacimiento?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Género de la persona' })
  genero?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Mundo natal de la persona' })
  mundo_natal?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'Películas en las que ha aparecido la persona', type: [String] })
  peliculas?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'Especies a las que pertenece la persona', type: [String] })
  especies?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'Vehículos que posee la persona', type: [String] })
  vehiculos?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'Naves estelares que posee la persona', type: [String] })
  naves_estelares?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Fecha de creación del registro' })
  creado?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Fecha de última edición del registro' })
  editado?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL del registro' })
  url?: string;
}
