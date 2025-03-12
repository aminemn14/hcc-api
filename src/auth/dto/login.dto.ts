import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "L'email doit être valide." })
  email: string;

  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  password: string;
}
