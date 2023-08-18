import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  /**
   * This user is temporal to simplify the project to let everybody
   * easily try the authenticated endpoints without signup.
   *
   * @private
   * @memberof UsersService
   */
  private readonly users = [
    {
      userId: 1,
      email: 'admin@admin.com',
      password: 'pass',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
