import { IsString, IsEmail, IsUUID, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Minimum password length
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string; // e.g., 'Admin', 'Operator', 'Viewer'

  @IsUUID()
  @IsNotEmpty()
  lgu_id: string;
}
