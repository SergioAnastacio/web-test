import type { Product } from "../domain/entities/Product";

export interface ProductRepository {
	getAll(): Promise<Product[]>;
	getById(id: number): Promise<Product | null>;
	save(product: Product): Promise<void>;
	delete(id: number): Promise<void>;
}
