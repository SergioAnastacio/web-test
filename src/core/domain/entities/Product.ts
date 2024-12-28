import { Money } from "../valueobj/Money";
import type { ProductImage } from "./ProductImages";

export class Product { 
    constructor(
        private readonly _id: number,
        private _name: string,
        private _price: Money,
        private _qty: string,
        private _images: ProductImage[],
        private readonly _created_at: Date,
        private readonly _updated_at: Date,
    ) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): Money {
        return this._price;
    }

    get qty(): string {
        return this._qty;
    }

    get images(): ProductImage[] {
        return this._images;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get updated_at(): Date {
        return this._updated_at;
    }

    updatePrice(newPrice: Money): void {
        if (newPrice.amount < 0) {
            throw new Error('Price cannot be negative');
        }
        this._price = newPrice;
    }

    updateQty(newQty: string): void {
        this._qty = newQty;
    }

    addImage(image: ProductImage): void {
        this._images.push(image);
    }

    updateName(newName: string): void {
        this._name = newName;
    }

    updateImage(image: ProductImage): void {
        const index = this._images.findIndex(img => img.id === image.id);
        if (index === -1) {
            throw new Error('Image not found');
        }
        this._images[index] = image;
    }
}