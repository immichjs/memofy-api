// src/flashcards/flashcards.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { FlashcardsService } from './flashcards.service'

@Controller('flashcards')
export class FlashcardsController {
	constructor(private readonly flashcardsService: FlashcardsService) {}

	// Criar flashcard
	@Post()
	async createFlashcard(@Body() body: { question: string; answer: string }) {
		const { question, answer } = body
		return this.flashcardsService.create(question, answer)
	}

	// Buscar flashcards para revisar
	@Get('review')
	async getFlashcardsForReview() {
		return this.flashcardsService.getFlashcardsForReview()
	}

	// Atualizar flashcard após avaliação
	@Post(':id/review')
	async updateFlashcard(
		@Param('id') id: string,
		@Body() body: { score: number },
	) {
		const { score } = body
		return this.flashcardsService.updateFlashcard(id, score)
	}
}
