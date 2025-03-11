import { IUserRepositoryContract } from '@modules/users/domain/contracts/user.repository.contract'
import { UserDocument } from '@modules/users/domain/entities/user'
import { ConflictUserException } from '@modules/users/domain/errors/conflict-user.exception'
import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'

import * as bcrypt from 'bcrypt'

@Injectable()
export class CreateUserUseCase {
	@Inject('IUserRepositoryContract')
	private readonly userRepository: IUserRepositoryContract

	public async execute(data: CreateUserDto): Promise<UserDocument> {
		const hasUser = await this.userRepository.findByEmail(data.email)

		if (hasUser) {
			throw new ConflictUserException()
		}

		return this.userRepository.create({
			...data,
			password: data.password
				? await this.generateHashPassword(data.password)
				: undefined,
		})
	}

	private async generateHashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(password, salt)
		return hashPassword
	}
}
