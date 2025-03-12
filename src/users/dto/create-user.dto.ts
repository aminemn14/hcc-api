import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../entities/user/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: "L'email doit être valide." })
  email: string;

  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  password: string;

  @IsEnum(Role, {
    message: 'Le rôle doit être "coach", "contributor" ou "player".',
  })
  role: Role;
}
