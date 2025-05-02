import { UserData } from "./user";

export interface LoginResponse {
  message: string;
  code: string;
  slug: string;
  data: UserData;
}
