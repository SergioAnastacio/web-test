import { axiosInstance } from "./AxiosConfig";
import type { LoginRpository } from "../port/LoginRepository";
import type { LoginFormDTO } from "./DTOs/LoginDTO";

export class LoginRepositoryImp implements LoginRpository {
	async login(loginDTO: LoginFormDTO): Promise<string> {
		console.log(loginDTO);
		const response = await axiosInstance.post("/login",  loginDTO);
		console.log(response.data);
		return response.data.access_token;
	}
}
