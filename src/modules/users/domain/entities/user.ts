import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	firstname: string

	@Prop({ required: true })
	lastname: string

	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: false })
	password?: string

	@Prop({ required: false })
	googleId?: string

	@Prop({ required: false })
	microsoftId?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
