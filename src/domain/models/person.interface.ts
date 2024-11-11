export interface Person {
  id?: string;
  nombre: string;
  altura: string;
  masa: string;
  color_cabello: string;
  color_piel: string;
  color_ojos: string;
  annio_nacimiento: string;
  genero: string;
  mundo_natal: string;
  peliculas: string[];
  especies: string[];
  vehiculos: string[];
  naves_estelares: string[];
  creado: string;
  editado: string;
  url: string;
}

export type UpdatePerson = Partial<Omit<Person, 'id'>>;
