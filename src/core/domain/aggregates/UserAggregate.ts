import { User } from "@/core/domain/entities/User";
import { Email } from "@/core/domain/valueobj/Email";

export class UserAggregate {
	private user: User;

	constructor(user: User) {
		this.user = user;
	}

	get id(): number {
		return this.user.id;
	}

	get email(): Email {
		return this.user.email;
	}

	get name(): string {
		return this.user.name;
	}
}
