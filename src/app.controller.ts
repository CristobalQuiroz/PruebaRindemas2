import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthdayModule } from './birthday/birthday.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'database.sqlite',
      entities: [__dirname + '/*/.entity{.ts,.js}'],
      synchronize: true,
    }),
    BirthdayModule,
  ],
})
export class AppModule {}