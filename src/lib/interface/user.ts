export interface UserModel {
  name: string;
  email: string;
  tel: string;
  role?: string;
  password: string;
  createdAt?: string;
}
export interface UserResponse {
  name: string;
  email: string;
  tel: string;
  role?: string;
  password: string;
  createdAt?: string;
}
export const UserModel = (): UserModel => ({
  name: "",
  email: "",
  tel: "",
  role: "user",
  password: "",
});
