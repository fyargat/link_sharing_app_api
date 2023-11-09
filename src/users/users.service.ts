import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  findByEmail(email: string) {
    return this.databaseService.user.findFirst({ where: { email } });
  }

  create(email: string, hash: string, salt: string) {
    return this.databaseService.user.create({
      data: {
        email,
        hash,
        salt,
      },
    });
  }
}
