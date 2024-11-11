export function translateToSpanish(data: any): any {
  return {
    nombre: data.name,
    altura: data.height,
    masa: data.mass,
    color_cabello: data.hair_color,
    color_piel: data.skin_color,
    color_ojos: data.eye_color,
    annio_nacimiento: data.birth_year,
    genero: data.gender,
    mundo_natal: data.homeworld,
    peliculas: data.films,
    especies: data.species,
    vehiculos: data.vehicles,
    naves_estelares: data.starships,
    creado: data.created,
    editado: data.edited,
    url: data.url,
  };
}
