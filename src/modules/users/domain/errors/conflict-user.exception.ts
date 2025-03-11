import { ConflictException } from '@nestjs/common'

export class ConflictUserException extends ConflictException {
	constructor() {
		super('Já existe um usuário cadastrado.')
	}
}
