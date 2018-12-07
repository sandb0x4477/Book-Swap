import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserForLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserForRegisterDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;
}

export class UserForReturnDTO {
  id: string;
  username: string;
  created: Date;
  token?: string;
}
