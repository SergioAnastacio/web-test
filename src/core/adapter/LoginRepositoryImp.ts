import { axiosInstance } from "./AxiosConfig";
import type { LoginRpository } from "../port/LoginRepository";
import type { LoginFormDTO } from "./DTOs/LoginDTO";

export class LoginRepositoryImp implements LoginRpository {
	async login(loginDTO: LoginFormDTO): Promise<string> {
		const response = await axiosInstance.post("/login", loginDTO);
		return response.data.access_token;
	}
}
