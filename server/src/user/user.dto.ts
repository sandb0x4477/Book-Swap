import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserForLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserForRegisterDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;
}

export class UserForReturnDTO {
  id: string;
  username: string;
  created: Date;
  city: string;
  token?: string;
  booksCount?: number;
  tradeCount?: number;
}
