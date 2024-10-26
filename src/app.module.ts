import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { AppConfiguration } from './configuration/app.configuration';
import { joiValidationSchema } from './configuration/joi.validation';

@Module({
  imports: [
    // configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfiguration],
      validationSchema: joiValidationSchema,
    }),
    // serve statics files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // mongoose module
    MongooseModule.forRoot(process.env.URL_MONGO, {
      dbName: 'pokemons',
    }),
    // app modules modules
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
