export class ImageUrl {
	constructor(private readonly _url: string) {
		if (!this.validateUrl(_url)) {
			throw new Error("Invalid URL");
		}
	}
	get url(): string {
		return this._url;
	}
	private validateUrl(url: string): boolean {
		return url.startsWith("http") || url.startsWith("https://"); //* x2 faster than regex
	}
}
