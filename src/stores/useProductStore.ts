import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductRepositoryImp } from "@/core/adapter/ProductRepositoryImp";
import { GetPageProducts } from "@/core/port/appservices/product/GetPagePrododucts";
import { GetByIDProduct } from "@/core/port/appservices/product/GetByIDProduct";
import { DeleteByIDProduct } from "@/core/port/appservices/product/DeleteByIDProduct";
import { SaveProduct } from "@/core/port/appservices/product/SaveProduct";
import type { Product } from "@/core/domain/entities/Product";
import type { ProductSaveDTO } from "@/core/adapter/DTOs/ProductDTO";

export const useProductStore = defineStore("productStore", () => {
	const products = ref<Product[]>([]);
	const product = ref<Product | null>(null);
	const loading = ref<boolean>(false);
	const endPage = ref<boolean>(false);
	const error = ref<string | null>(null);
	const productRepository = new ProductRepositoryImp();

	const fetchProducts = async (perPage: number, page: number) => {
		loading.value = true;
		error.value = null;
		try {
			flushData();
			const getPageProducts = new GetPageProducts(productRepository);
			products.value = await getPageProducts.execute(perPage, page);
			if (products.value.length < perPage) {
				endPage.value = true;
			} else {
				endPage.value = false;
			}
		} catch (err) {
			endPage.value = true;
			flushData();
			error.value = "Failed to fetch products" + err;
		} finally {
			loading.value = false;
		}
	};
	const getProductById = async (id: number) => {
		loading.value = true;
		error.value = null;
		try {
			const getByIdProduct = new GetByIDProduct(productRepository);
			product.value = await getByIdProduct.execute(id);
		} catch (err) {
			error.value = "Failed to fetch products" + err;
		} finally {
			loading.value = false;
		}
	};
	const saveProduct = async (product: ProductSaveDTO) => {
		loading.value = true;
		error.value = null;
		try {
			const formData = new FormData();
			formData.append("name", product.name);
			formData.append("price", product.price.toString());
			formData.append("qty", product.qty.toString());
			product.images.forEach((image) => {
				formData.append("images[]", image);
			});
			product.urls.forEach((url, index) => {
				formData.append(`urls[${index}]`, url);
			});

			const saveProduct = new SaveProduct(productRepository);
			await saveProduct.execute(formData, product.id);
		} catch (err: any) {
			if (err.response && err.response.status) {
				error.value = `Error saving product: ${err.response.status} ${err.response.statusText}`;
			} else {
				error.value = "Error saving product: " + err.message;
			}
		} finally {
			loading.value = false;
		}
	};
	const flushData = () => {
		products.value = [];
		product.value = null;
	};
	const delteProduct = async (id: number) => {
		try {
			const deletebyidproduct = new DeleteByIDProduct(productRepository);
			await deletebyidproduct.execute(id);
		} catch (err) {
			error.value = "Failed to delete product" + err;
		}
	};
	return {
		products,
		product,
		loading,
		error,
		endPage,
		fetchProducts,
		getProductById,
		saveProduct,
		delteProduct,
	};
});
