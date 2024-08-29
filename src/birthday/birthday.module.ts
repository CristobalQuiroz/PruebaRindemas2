import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthdayController } from './birthday.controller';
import { BirthdayService } from './birthday.service';
import { Rindegastino } from './rindegastino.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Rindegastino])],
  controllers: [BirthdayController],
  providers: [BirthdayService],
})
export class BirthdayModule {}