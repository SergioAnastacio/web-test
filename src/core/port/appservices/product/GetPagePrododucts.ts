import type { ProductRepository } from "../../ProductRepository";
import type { Product } from "../../../domain/entities/Product";

export class GetPageProducts {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(perPage: number, page: number): Promise<Product[]> {
		return this.productRepository.getPage(perPage, page);
	}
}
