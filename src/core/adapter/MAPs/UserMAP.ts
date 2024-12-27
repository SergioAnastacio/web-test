import { User } from "@/core/domain/entities/User";
import { UserAggregate } from "@/core/domain/aggregates/UserAggregate";
import type { UserDTO } from "../DTOs/UserDTO";
import { Email } from "@/core/domain/valueobj/Email";

export const toDomain = (dto: UserDTO): UserAggregate => {
	const user = new User(dto.id, new Email(dto.email), dto.name);
	return new UserAggregate(user);
};

export const toDTO = (userAggregate: UserAggregate): UserDTO => {
	return {
		id: userAggregate.id,
		name: userAggregate.name,
		email: userAggregate.email.email,
	};
};
