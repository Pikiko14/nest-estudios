/* eslint-disable @typescript-eslint/no-unused-vars */
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Can not create pokemon - check server logs',
      );
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const pokemons = this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
    return pokemons;
  }

  async findOne(pokemonNo: string | number) {
    try {
      let pokemon: Pokemon;

      if (!isNaN(+pokemonNo))
        pokemon = await this.pokemonModel.findOne({ no: pokemonNo });

      if (!pokemon)
        pokemon = await this.pokemonModel.findOne({ name: pokemonNo });

      if (!pokemon && isValidObjectId(pokemonNo))
        pokemon = await this.pokemonModel.findById(pokemonNo);

      if (!pokemon)
        throw new NotFoundException(`Pokemon #${pokemonNo} not found`);

      return pokemon;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string | number, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(id);
      if (!pokemon) throw new NotFoundException(`Pokemon #${id} not found`);

      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return pokemon;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(_id: string | number) {
    const pokemon = await this.pokemonModel.deleteOne({ _id });

    if (pokemon.deletedCount === 0)
      throw new NotFoundException(`Pokemon #${_id} not found`);

    return pokemon;
  }

  async insertMany(pokemons: CreatePokemonDto[]) {
    try {
      await this.pokemonModel.insertMany(pokemons);
      return pokemons;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async clearCollection() {
    await this.pokemonModel.deleteMany({});
  }
}
