import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
  ) { }

  async getPokemonList () {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const { results } = response.data;
    return results;
  }

  async getPokemonInfo (name: string) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    console.log(response);
    const { moves, sprites } = response.data;
    return {moves, sprites};
  }
}
