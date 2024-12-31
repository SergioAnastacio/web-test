import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";
import type { ProductRepository } from "../../ProductRepository";
import type { Product } from "@/core/domain/entities/Product";

export class SaveProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(product: Product | ProductSaveDTO, id?: number): Promise<void> {
		await this.productRepository.save(product, id);
	}
}
