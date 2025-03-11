// src/flashcards/flashcards.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Flashcard } from './schemas/flashcard.schema'

@Injectable()
export class FlashcardsService {
	constructor(
		@InjectModel('Flashcard') private readonly flashcardModel: Model<Flashcard>,
	) {}

	// Criar novo flashcard
	async create(question: string, answer: string): Promise<Flashcard> {
		const flashcard = new this.flashcardModel({
			question,
			answer,
		})
		return flashcard.save()
	}

	// Buscar todos os flashcards que precisam ser revisados
	async getFlashcardsForReview(): Promise<Flashcard[]> {
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		return this.flashcardModel.find({ nextReview: { $lte: today } }).exec()
	}

	// Atualizar flashcard após avaliação
	async updateFlashcard(id: string, score: number): Promise<Flashcard> {
		const flashcard = await this.flashcardModel.findById(id)

		if (!flashcard) throw new Error('Flashcard não encontrado!')

		let { ef, interval, repetition } = flashcard

		// Calculando o fator de facilidade (EF)
		ef = ef + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02))
		if (ef < 1.3) ef = 1.3 // EF não pode ser menor que 1.3

		// Lógica de atualização do intervalo
		if (score < 3) {
			interval = 1 // Se o usuário teve dificuldades, retorna para 1 dia
			repetition = 0 // Reseta as repetições
		} else {
			repetition += 1
			if (repetition === 1) interval = 1
			else if (repetition === 2) interval = 6
			else interval = Math.round(interval * ef)
		}

		// Calculando a próxima data de revisão
		const nextReview = new Date()
		nextReview.setDate(nextReview.getDate() + interval)

		// Atualizando o flashcard no banco
		flashcard.ef = ef
		flashcard.interval = interval
		flashcard.repetition = repetition
		flashcard.nextReview = nextReview

		return flashcard.save()
	}
}
