import type { ImageUrl } from "../valueobj/ImageUrl";

//*
export class ProductImage {
	constructor(
		private readonly _url: ImageUrl,
		private readonly _id: number,
	) {}
	get id(): number {
		return this._id;
	}
	get url(): ImageUrl {
		return this._url;
	}
}
