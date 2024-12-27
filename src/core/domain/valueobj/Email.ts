export class Email {
	constructor(private readonly _email: string) {
		if (!this.validateEmail(_email)) {
			throw new Error("Invalid email");
		}
	}
	get email(): string {
		return this._email;
	}
	private validateEmail(email: string): boolean {
		const re = /\S+@\S+\.\S+/;
		return re.test(email); //* boolean : check is valid email
	}
}
