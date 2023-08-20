import { Test, TestingModule } from '@nestjs/testing';
import { Users, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by id', () => {
    expect(service.getUserById(Users[0].id)).toEqual(Users[0]);
  });
});
