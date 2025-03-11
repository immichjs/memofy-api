import { UserDocument } from '@modules/users/domain/entities/user'
import { CreateUserDto } from '../../application/dto/create-user.dto'
import { UpdateUserDto } from '../../application/dto/update-user.dto'

export interface IUserRepositoryContract {
	create(data: CreateUserDto): Promise<UserDocument>
	findById(id: string): Promise<UserDocument | null>
	findByEmail(email: string): Promise<UserDocument | null>
	delete(id: string): Promise<void>
	update(data: UpdateUserDto): Promise<UserDocument>
}
