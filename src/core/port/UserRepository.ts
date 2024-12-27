import type { UserAggregate } from "../domain/aggregates/UserAggregate";

export interface UserRepository {
	whoami(): Promise<UserAggregate | null>;
	getById(id: string): Promise<UserAggregate | null>;
	save(user: UserAggregate): Promise<void>;
}
