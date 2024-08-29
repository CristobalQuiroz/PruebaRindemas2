import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rindegastino } from './rindegastino.entity';
import { parse, differenceInDays, addYears } from 'date-fns';



@Injectable()
export class BirthdayService {
  constructor(
    @InjectRepository(Rindegastino)
    private rindegastinoRepository: Repository<Rindegastino>,
  ) {}

  async getDaysUntilBirthday(birthdate: string): Promise<number> {
    const today = new Date();
    const parsedBirthdate = parse(birthdate, 'dd-MM-yyyy', new Date());
    let nextBirthday = new Date(today.getFullYear(), parsedBirthdate.getMonth(), parsedBirthdate.getDate());

    if (nextBirthday < today) {
      nextBirthday = addYears(nextBirthday, 1);
    }

    return differenceInDays(nextBirthday, today);
  }

  async addRindegastino(name: string, birthdate: string): Promise<Rindegastino> {
    // Verificar si ya existe un registro con el mismo nombre y fecha de cumpleaños
    const existingRindegastino = await this.rindegastinoRepository.findOne({
      where: { name, birthdate },
    });

    if (existingRindegastino) {
      // Si ya existe, lanzar una excepción
      throw new ConflictException('El Rindegastino ya existe con el mismo nombre y cumpleaños.');
    }

    // Crear y guardar el nuevo registro
    const rindegastino = this.rindegastinoRepository.create({ name, birthdate });
    return this.rindegastinoRepository.save(rindegastino);
  }

  async getRindegastinos(): Promise<Rindegastino[]> {
    return this.rindegastinoRepository.find();
  }
}