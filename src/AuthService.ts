import { User } from "../domain/user;

export interface AuthSerive {
  login(email: string, password: string): Promise<User | null>;
  logout(): Promise <void>;
}
  
