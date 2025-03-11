import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FlashcardsModule } from './modules/flashcards/flashcards.module'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/memofy'),
		FlashcardsModule,
		UsersModule,
	],
})
export class AppModule {}
