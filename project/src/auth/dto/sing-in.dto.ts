import { IsEmail } from 'class-validator';
import { DtoProperty } from 'src/shared/dto-property';
import { IsNotEmptyString } from 'src/shared/validators/is-not-empty-string.validator';

export class SingInDto {
  @DtoProperty({
    description: 'User email',
    example: 'admin@admin.com',
  })
  @IsEmail()
  email: string;

  @DtoProperty({
    description: 'User password',
    example: 'pass',
  })
  @IsNotEmptyString()
  password: string;
}
