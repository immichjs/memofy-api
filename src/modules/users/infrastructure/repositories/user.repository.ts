import { CreateUserDto } from '@modules/users/application/dto/create-user.dto'
import { UpdateUserDto } from '@modules/users/application/dto/update-user.dto'
import { IUserRepositoryContract } from '@modules/users/domain/contracts/user.repository.contract'
import { User, UserDocument } from '@modules/users/domain/entities/user'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UserRepository implements IUserRepositoryContract {
	@InjectModel(User.name) private readonly repository: Model<User>

	public async create(data: CreateUserDto): Promise<UserDocument> {
		const user = await this.repository.insertOne(data)
		return user
	}

	public async findById(id: string): Promise<UserDocument | null> {
		const user = await this.repository.findById(id).exec()
		return user
	}

	public async findByEmail(email: string): Promise<UserDocument | null> {
		const user = await this.repository.findOne({ email }).exec()
		return user
	}

	public async delete(id: string): Promise<void> {
		await this.repository.deleteOne({ _id: id }).exec()
	}

	update(data: UpdateUserDto): Promise<UserDocument> {
		throw Error()
	}
}
