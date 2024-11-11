import axios from 'axios';
import { translateToSpanish } from '../helpers/swapi-transform.helper';

export class SwapiClient {
  private readonly baseUrl = 'https://swapi.py4e.com/api';

  async getCharacter(id: number): Promise<any> {
    const url = `${this.baseUrl}/people/${id}/`;
    try {
      const response = await axios.get(url);
      return translateToSpanish(response.data);
    } catch (error) {
      console.error('Error fetching character from SWAPI:', error.message);
      throw new Error('Failed to fetch character data from SWAPI');
    }
  }

  async getCharacters(): Promise<any[]> {
    let characters = [];

    try {
      const response = await axios.get(`${this.baseUrl}/people/`);
      const translatedResults = response.data.results.map(translateToSpanish);
      characters = [...translatedResults];

      const totalCharacters = response.data.count;
      const pageSize = response.data.results.length;
      const totalPages = Math.ceil(totalCharacters / pageSize);

      const promises = [];
      for (let page = 2; page <= totalPages; page++) {
        promises.push(
          axios
            .get(`${this.baseUrl}/people/?page=${page}`)
            .then((res) => res.data.results.map(translateToSpanish)),
        );
      }

      const results = await Promise.all(promises);

      results.forEach((pageResults) => {
        characters = [...characters, ...pageResults];
      });
      return characters;
    } catch (error) {
      console.error('Error fetching characters from SWAPI:', error.message);
      throw new Error('Failed to fetch characters data from SWAPI');
    }
  }

  async getPlanet(id: number): Promise<any> {
    const url = `${this.baseUrl}/planets/${id}/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching planet from SWAPI:', error.message);
      throw new Error('Failed to fetch planet data from SWAPI');
    }
  }

  async getPlanets(): Promise<any> {
    const url = `${this.baseUrl}/planets/`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching planets from SWAPI:', error.message);
      throw new Error('Failed to fetch planets data from SWAPI');
    }
  }

  async getSpecies(id: number): Promise<any> {
    const url = `${this.baseUrl}/species/${id}/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching species from SWAPI:', error.message);
      throw new Error('Failed to fetch species data from SWAPI');
    }
  }

  async getSpeciesList(): Promise<any> {
    const url = `${this.baseUrl}/species/`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching species from SWAPI:', error.message);
      throw new Error('Failed to fetch species data from SWAPI');
    }
  }

  async getStarship(id: number): Promise<any> {
    const url = `${this.baseUrl}/starships/${id}/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching starship from SWAPI:', error.message);
      throw new Error('Failed to fetch starship data from SWAPI');
    }
  }

  async getStarships(): Promise<any> {
    const url = `${this.baseUrl}/starships/`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching starships from SWAPI:', error.message);
      throw new Error('Failed to fetch starships data from SWAPI');
    }
  }

  async getVehicle(id: number): Promise<any> {
    const url = `${this.baseUrl}/vehicles/${id}/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle from SWAPI:', error.message);
      throw new Error('Failed to fetch vehicle data from SWAPI');
    }
  }

  async getVehicles(): Promise<any> {
    const url = `${this.baseUrl}/vehicles/`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching vehicles from SWAPI:', error.message);
      throw new Error('Failed to fetch vehicles data from SWAPI');
    }
  }
}
