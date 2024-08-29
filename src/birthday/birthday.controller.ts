import { Controller, Post, Get, Query, Body, ConflictException, BadRequestException } from '@nestjs/common';
import { BirthdayService } from './birthday.service';
import { Rindegastino } from './rindegastino.entity';
import { format, parse } from 'date-fns';

@Controller('birthday')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Post('addRindegastino')
  async addRindegastino(
    @Body('name') name: string,
    @Body('birthdate') birthdate: string,
  ): Promise<Rindegastino> {
    try {
      return await this.birthdayService.addRindegastino(name, birthdate);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Error al agregar el Rindegastino.');
    }
  }

  @Get('getDaysUntilMyBirthday')
  async getDaysUntilMyBirthday(@Query('birthdate') birthdate: string): Promise<number> {
    return this.birthdayService.getDaysUntilBirthday(birthdate);
  }

  @Get('getRindegastinosBirthdays')
  async getRindegastinosBirthdays(): Promise<any[]> {
    const rindegastinos = await this.birthdayService.getRindegastinos();
    return Promise.all(rindegastinos.map(async r => {
      const formattedBirthdate = format(parse(r.birthdate, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy');
      return {
        name: r.name,
        birthdate: formattedBirthdate,
        daysUntilBirthday: await this.birthdayService.getDaysUntilBirthday(formattedBirthdate),
      };
    }));
  }
}