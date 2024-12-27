import type { LoginFormDTO } from "../adapter/DTOs/LoginDTO";

export interface LoginRpository {
	login(loginDTO: LoginFormDTO): Promise<string>;
}
