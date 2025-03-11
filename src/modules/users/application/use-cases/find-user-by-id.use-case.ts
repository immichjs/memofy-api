import { IUserRepositoryContract } from '@modules/users/domain/contracts/user.repository.contract'
import { UserDocument } from '@modules/users/domain/entities/user'
import { UserNotFoundException } from '@modules/users/domain/errors/user-not-found.exception'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class FindUserByIdUseCase {
	@Inject('IUserRepositoryContract')
	private readonly userRepository: IUserRepositoryContract

	public async execute(id: string): Promise<UserDocument> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new UserNotFoundException()
		}

		return user
	}
}
