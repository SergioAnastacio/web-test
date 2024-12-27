import type { Email } from "../valueobj/Email";

export class User {
	constructor(
		private _id: number,
		private _email: Email,
		private _name: string,
	) {}
	get id(): number {
		return this._id;
	}
	get email(): Email {
		return this._email;
	}
	get name(): string {
		return this._name;
	}
}
