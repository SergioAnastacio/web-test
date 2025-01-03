import type { Product } from "../domain/entities/Product";

//* Important : Overload methods on interface are not allowed
//* so we need to create a new interface for each method or
//* use || to union the types
export interface ProductRepository {
	getPage(perPage: number, page: number): Promise<Product[]>;
	getById(id: number): Promise<Product | null>;
	save(product: Product | FormData, id?: number): Promise<void>;
	delete(id: number): Promise<void>;
}
