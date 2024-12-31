import { axiosInstance } from "./AxiosConfig";
import type { ProductRepository } from "../port/ProductRepository";
import type { Product } from "../domain/entities/Product";
import { productDTOSchema, productsDTOSchema } from "./DTOs/ProductDTO";
import { toDomain, toDomainArray, toDTO } from "./MAPs/productMAP";
import router from "@/router";

//TODO: Try to implement a function to handle  errors like this HanldingErrors(err:Error,ERROR::TYPE:Enumerable,msg:string):void
//TODO: maybe we can use logger instead of console.log to log errors in the future
export class ProductRepositoryImp implements ProductRepository {
	private readonly _endpoint: string = "products";

	async getPage(perPage: number, page: number): Promise<Product[]> {
		try {
			const response = await axiosInstance.get(this._endpoint, {
				params: {
					perpage: perPage,
					page: page,
				},
			});
			const parsedData = productsDTOSchema.parse(response.data.data);
			return toDomainArray(parsedData); //!! return []of domain object
			//
		} catch (err) {
			throw new Error("Error fetching products" + err);
		}
	}
	async getById(id: number): Promise<Product | null> {
		try {
			const response = await axiosInstance.get(`${this._endpoint}/${id}`);
			const parsedData = productDTOSchema.parse(response.data.data);
			return toDomain(parsedData);
		} catch (err:any) {
			//* Redirect to login page on 404 error
			if (err.response.status === 404) {
				router.push("/");
			}
			throw new Error("Error fetching product by id: " + err);
		}
	}
	//*TODO: Should be able to save product with images
	async save(product: Product): Promise<void> {
		try {
			const productDTO = toDTO(product);
			await axiosInstance.post(this._endpoint, productDTO);
		} catch (err) {
			throw new Error("Error saving product" + err);
		}
	}
	//*TODO: Implement delete method
	async delete(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`${this._endpoint}/${id}`);
		} catch (err) {
			throw new Error("Error deleting product" + err);
		}
	}
}
