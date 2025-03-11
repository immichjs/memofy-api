import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
	@IsNotEmpty()
	firstname: string

	@IsNotEmpty()
	lastname: string

	@IsNotEmpty()
	email: string

	@IsOptional()
	password?: string

	@IsOptional()
	googleId: string

	@IsOptional()
	microsoftId: string
}
