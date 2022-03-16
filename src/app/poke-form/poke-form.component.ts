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

  ngOnInit(): void {
    this.catchEm();
  }

  pokemonList: any = [];
  moveList: any = [];
  pokemon: any = [{img: '', name: '', moves: []}];
  component: any = PokemonComponent;

  async catchEm () {
    const response = await this.ApiService.getPokemonList();
    for (let poke of response) {
      this.pokemonList.push(poke.name)
    }

    console.log(this.pokemonList)
  }

  async selectMe (name: any) {
    console.log(name.value);
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
