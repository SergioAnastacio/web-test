import { axiosInstance } from "./AxiosConfig";
import type { ProductRepository } from "../port/ProductRepository";
import type { Product } from "../domain/entities/Product";

//TODO: Save product , need atach image files to the request ***
//TODO: Implements Shecma validation and mapper for Product
export class ProductRepositoryImp implements ProductRepository {
	private readonly _endpoint: string = "products";
	async getAll(): Promise<Product[]> {
		const response = await axiosInstance.get(this._endpoint);
		return response.data;
	}
	async getById(id: number): Promise<Product | null> {
		const response = await axiosInstance.get(`${this._endpoint}/${id}`);
		return response.data;
	}
	async save(product: Product): Promise<void> {
		await axiosInstance.post(this._endpoint, product);
	}
	async delete(id: number): Promise<void> {
		await axiosInstance.delete(`${this._endpoint}/${id}`);
	}
}
