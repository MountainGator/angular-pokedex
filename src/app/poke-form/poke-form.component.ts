import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PokemonComponent } from '../pokemon/pokemon.component';

@Component({
  selector: 'app-poke-form',
  templateUrl: './poke-form.component.html',
  styleUrls: ['./poke-form.component.css']
})
export class PokeFormComponent implements OnInit {
  
  constructor(
    private ApiService: ApiService,
  ) { }

  pokemonList: any = ['bulbasaur'];
  moveList: any = [];
  pokemon: any = [{img: '', name: '', moves: []}];

  ngOnInit(): void {
    this.catchEm();
    setTimeout(() => (
    this.firstPoke(this.pokemonList[0])), 50)
  }

  
  component: any = PokemonComponent;

  async catchEm () {
    this.pokemonList = [];
    const response = await this.ApiService.getPokemonList();
    for (let poke of response) {
      this.pokemonList.push(poke.name)
    }

    console.log(this.pokemonList)
  }

  async firstPoke (name: string) {
    console.debug(this.firstPoke)
    const res = await this.ApiService.getPokemonInfo(name);
    const { moves, sprites } = res;
    for (let move of moves) {
      this.moveList.push(move);
    }

    this.pokemon = [{img: sprites.front_shiny, name: name, moves: this.moveList}];

    console.log(this.pokemon)
    console.log(this.moveList)
  }

  async selectMe (name: any) {
    console.log(name.value);
    this.moveList = [];
    const res = await this.ApiService.getPokemonInfo(`${name.value}`);
    const { moves, sprites } = res;
    for (let move of moves) {
      this.moveList.push(move);
    }

    this.pokemon = [{img: sprites.front_shiny, name: name.value, moves: this.moveList}];

    console.log(this.pokemon)
    console.log(this.moveList)
  }

}
