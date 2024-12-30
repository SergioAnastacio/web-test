import type { ImageUrl } from "../valueobj/ImageUrl";

//*
export class ProductImage {
	constructor(
		private readonly _id: number,
		private readonly _url: ImageUrl,
	) {}
	get id(): number {
		return this._id;
	}
	get url(): ImageUrl {
		return this._url;
	}
}
