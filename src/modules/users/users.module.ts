import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateUserUseCase } from './application/use-cases/create-user.use-case'
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case'
import { User, UserSchema } from './domain/entities/user'
import { UserRepository } from './infrastructure/repositories/user.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
	providers: [
		{
			provide: 'IUserRepositoryContract',
			useClass: UserRepository,
		},
		CreateUserUseCase,
		FindUserByIdUseCase,
		UsersService,
	],
})
export class UsersModule {}
