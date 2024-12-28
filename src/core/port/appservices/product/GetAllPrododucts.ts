import type { ProductRepository } from "../../ProductRepository";
import type { Product } from "../../../domain/entities/Product";

export class GetAllProducts {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(): Promise<Product[]> {
		return this.productRepository.getAll();
	}
}
