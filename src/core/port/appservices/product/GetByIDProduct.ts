import type { Product } from "@/core/domain/entities/Product";
import type { ProductRepository } from "../../ProductRepository";

export class GetByIDProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(id: number): Promise<Product | null> {
		return this.productRepository.getById(id);
	}
}
