import { Test, TestingModule } from '@nestjs/testing';
import { BirthdayController } from './birthday.controller';

describe('BirthdayController', () => {
  let controller: BirthdayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BirthdayController],
    }).compile();

    controller = module.get<BirthdayController>(BirthdayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
