import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FlashcardsModule } from './modules/flashcards/flashcards.module'

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/memofy'),
		FlashcardsModule,
	],
})
export class AppModule {}
