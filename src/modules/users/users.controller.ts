import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { CreateUserDto } from './application/dto/create-user.dto'
import { UserDocument } from './domain/entities/user'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	@Inject() private readonly usersService: UsersService

	@Post()
	public async create(@Body() data: CreateUserDto): Promise<UserDocument> {
		return this.usersService.create(data)
	}

	@Get(':id')
	public async findById(@Param('id') id: string): Promise<UserDocument | null> {
		return this.usersService.findById(id)
	}
}
