import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './application/dto/create-user.dto'
import { CreateUserUseCase } from './application/use-cases/create-user.use-case'
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case'
import { UserDocument } from './domain/entities/user'

@Injectable()
export class UsersService {
	@Inject() private readonly createUserUseCase: CreateUserUseCase
	@Inject() private readonly findUserByIdUseCase: FindUserByIdUseCase

	public async create(data: CreateUserDto): Promise<UserDocument> {
		return this.createUserUseCase.execute(data)
	}

	public async findById(id: string): Promise<UserDocument> {
		return this.findUserByIdUseCase.execute(id)
	}
}
