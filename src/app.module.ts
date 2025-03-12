import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { NewsModule } from './news/news.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    MatchesModule,
    NewsModule,
    JwtModule.register({
      secret: 'votre_secret_jwt',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
