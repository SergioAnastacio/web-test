import { axiosInstance } from "./AxiosConfig";
import type { ProductRepository } from "../port/ProductRepository";
import { Product } from "../domain/entities/Product";
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
		} catch (err: any) {
			throw new Error("Error fetching products" + err);
		}
	}
	async getById(id: number): Promise<Product | null> {
		try {
			const response = await axiosInstance.get(`${this._endpoint}/${id}`);
			const parsedData = productDTOSchema.parse(response.data.data);
			return toDomain(parsedData);
		} catch (err: any) {
			//* Redirect to login page on 404 error
			if (err.response.status === 404) {
				router.push("/");
			}
			throw new Error("Error fetching product by id: " + err);
		}
	}

	private async saveProductData(
		url: string,
		product: Product,
		isUpdate: boolean,
	): Promise<void> {
		const dto = toDTO(product);
		if (isUpdate) {
			await axiosInstance.put(url, dto);
		} else {
			await axiosInstance.post(url, dto);
		}
	}

	private async saveProductFormData(
		url: string,
		product: FormData,
		isUpdate: boolean,
	): Promise<void> {
		axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data";
		if (isUpdate) {
			await axiosInstance.putForm(url, product);
		} else {
			await axiosInstance.post(url, product);
		}
	}
	//TODO : Improve this function to handle product directly instead of FormData
	async save(product: Product | FormData, id?: number): Promise<void> {
		const isUpdate = id ? true : false;
		const url = isUpdate ? `${this._endpoint}/${id}` : this._endpoint;
		try {
			if (product instanceof Product) {
				await this.saveProductData(url, product, isUpdate);
			} else {
				await this.saveProductFormData(url, product, isUpdate);
			}
		} catch (err: any) {
			if (err.response && err.response.status) {
				throw new Error(
					`Error saving product: ${err.response.status} ${err.response.statusText}`,
				);
			}
		}
	}

	async delete(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`${this._endpoint}/${id}`);
		} catch (err) {
			throw new Error("Error deleting product" + err);
		}
	}
}
