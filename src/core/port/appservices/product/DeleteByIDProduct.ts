import type { ProductRepository } from "../../ProductRepository";

export class DeleteByIDProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(id: number): Promise<void> {
		return this.productRepository.delete(id);
	}
}
