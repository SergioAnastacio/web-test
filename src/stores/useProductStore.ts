import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductRepositoryImp } from "@/core/adapter/ProductRepositoryImp";
import { GetPageProducts } from "@/core/port/appservices/product/GetPagePrododucts";
import { GetByIDProduct } from "@/core/port/appservices/product/GetByIDProduct";
import { DeleteByIDProduct } from "@/core/port/appservices/product/DeleteByIDProduct";
import type { Product } from "@/core/domain/entities/Product";

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
			endPage.value = false;
		} catch (err) {
			endPage.value = true;
			flushData();
			error.value = "Failed to fetch products" + err;
		} finally {
			loading.value = false;
		}
	};
	const getProductById = async (id: number) => {
		try {
			const getByIdProduct = new GetByIDProduct(productRepository);
			product.value = await getByIdProduct.execute(id);
		} catch (err) {
			error.value = "Failed to fetch products" + err;
		} finally {
			loading.value = false;
		}
	};
	const flushData = () => {
		products.value = [];
		product.value = null;
		loading.value = false;
		error.value = null;
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
		delteProduct,
	};
});
