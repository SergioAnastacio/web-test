import type { UserRepository } from "@/core/port/UserRepository";
import { UserAggregate } from "@/core/domain/aggregates/UserAggregate";

export class GetUser {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<UserAggregate | null> {
		return await this.userRepository.whoami();
	}
}
