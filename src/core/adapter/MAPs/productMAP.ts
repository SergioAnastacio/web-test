import { Product } from "@/core/domain/entities/Product";
import type { ProductDTO } from "@/core/adapter/DTOs/ProductDTO";
import { Money } from "@/core/domain/valueobj/Money";
import { ProductImage } from "@/core/domain/entities/ProductImages";
import { ImageUrl } from "@/core/domain/valueobj/ImageUrl";

//Case 1: Convert DTO to Product
export const toDomain = (dto: ProductDTO): Product => {
	const images = dto.images.map(
		(image) => new ProductImage(image.id, new ImageUrl(image.url)),
	);
	const product = new Product(
		dto.id,
		dto.name,
		new Money(dto.price, "MXN"),
		dto.qty,
		images,
		new Date(dto.created_at),
		new Date(dto.updated_at),
	);
	return product; //!! return the domain object , todo: implement aggregate. can be Inventory
};
//Case 2 : Convert DTO to Products
export const toDomainArray = (dtos: ProductDTO[]): Product[] => {
	const products: Product[] = [];
	for (const dto of dtos) {
		products.push(toDomain(dto));
	}
	return products;
};

//* note: check if match on api server
//* We able to pass file objs to api server. they response with image urls
export const toDTO = (product: Product): ProductDTO => {
	return {
		id: product.id,
		name: product.name,
		price: product.price.amount,
		qty: product.qty,
		images: product.images.map((image) => ({
			id: image.id,
			url: image.url.url,
		})),
		created_at: product.created_at.toISOString(),
		updated_at: product.updated_at.toISOString(),
	};
};
