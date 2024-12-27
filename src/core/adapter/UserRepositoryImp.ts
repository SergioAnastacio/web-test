import type { UserRepository } from "@/core/port/UserRepository";
import { toDomain, toDTO } from "./MAPs/UserMAP";
import { UserAggregate } from "@/core/domain/aggregates/UserAggregate";
import { axiosInstance } from "./AxiosConfig";
import { userDTOSchema } from "./DTOs/UserDTO";

export class UserRepositoryImp implements UserRepository {
	async whoami(): Promise<UserAggregate | null> {
		try {
			const response = await axiosInstance.get(`/user`);
			const parsedData = userDTOSchema.parse(response.data.data);
			return toDomain(parsedData);
		} catch (error) {
			return null;
		}
	}

	async getById(id: string): Promise<UserAggregate | null> {
		try {
			const response = await axiosInstance.get(`/user/${id}`);
			const parsedData = userDTOSchema.parse(response.data);
			return toDomain(parsedData);
		} catch (error) {
			//* Handle error here
			return null;
		}
	}

	async save(userAggregate: UserAggregate): Promise<void> {
		try {
			await axiosInstance.post("/user", toDTO(userAggregate));
		} catch (error) {
			//* Handle error here
		}
	}
}
