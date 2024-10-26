import { PokemonService } from 'src/pokemon/pokemon.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokemonResponse } from 'src/common/interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    try {
      await this.pokemonService.clearCollection(); // clear data
      const data = await this.http.get<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1000',
      );
      const pokemons = data.results.map(({ name, url }) => {
        return { name, no: +url.split('/').at(-2) };
      });
      // insert pokemons
      await this.pokemonService.insertMany(pokemons);

      return pokemons;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
