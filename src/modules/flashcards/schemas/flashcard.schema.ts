import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type FlashcardDocument = HydratedDocument<Flashcard>

@Schema({ timestamps: true })
export class Flashcard {
	@Prop({ required: true })
	question: string

	@Prop()
	answer: string

	@Prop({ type: Number, default: 2.5 })
	ef: number

	@Prop({ type: Number, default: 1 })
	interval: number

	@Prop({ type: Number, default: 0 })
	repetition: number

	@Prop({ type: Date, default: Date.now })
	nextReview: Date
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard)
