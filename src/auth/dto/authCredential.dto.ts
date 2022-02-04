import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

/* eslint-disable prettier/prettier */
export class authCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'only use english and number!'
  })
  password: string;
}